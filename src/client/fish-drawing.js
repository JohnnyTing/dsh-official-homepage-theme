const TAU = Math.PI * 2

/* Every fish is drawn in a local frame where +x points at the snout, +y points
   at the belly and the caller has already translated to the fish and rotated
   by its heading. Lengths below are fractions of `fish.length`; at the 44 px
   size used on the homepage that is the only scale where anatomy still reads,
   so the silhouette and the shading carry most of the realism. */
const SNOUT_X = 0.5
const PEDUNCLE_X = -0.44
const BODY_SPAN = SNOUT_X - PEDUNCLE_X
const BODY_SAMPLES = 36
/* One body wave runs from the head to the tail. The phase lag makes the tail
   answer the head instead of the whole fish wagging as one rigid piece. */
const BODY_WAVE = 4

/* Half body depth as a fraction of the body length, from the snout (0) to the
   caudal peduncle (1). The deepest point sits just behind the head, and the
   taper into a narrow peduncle gives the tail fin a real joint to hang from. */
const BODY_DEPTH_PROFILE = Object.freeze([
  [0, 0.007],
  [0.02, 0.022],
  [0.06, 0.054],
  [0.12, 0.081],
  [0.2, 0.097],
  [0.3, 0.107],
  [0.42, 0.112],
  [0.55, 0.106],
  [0.66, 0.095],
  [0.77, 0.076],
  [0.86, 0.059],
  [0.93, 0.042],
  [1, 0.029],
])

function withAlpha(hex, alpha) {
  const value = parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

function cubicHermite(start, startSlope, end, endSlope, t) {
  const squared = t * t
  const cubed = squared * t
  return (2 * cubed - 3 * squared + 1) * start
    + (cubed - 2 * squared + t) * startSlope
    + (-2 * cubed + 3 * squared) * end
    + (cubed - squared) * endSlope
}

/** Half body depth (as a fraction of body length) at `progress` from snout to peduncle. */
export function fishBodyHalfDepth(progress) {
  const anchored = Math.min(1, Math.max(0, progress))
  const keys = BODY_DEPTH_PROFILE
  let index = 0
  while (index < keys.length - 2 && anchored > keys[index + 1][0]) index += 1
  const start = keys[index]
  const end = keys[index + 1]
  const span = end[0] - start[0]
  const previous = keys[Math.max(0, index - 1)]
  const next = keys[Math.min(keys.length - 1, index + 2)]
  const local = span === 0 ? 0 : (anchored - start[0]) / span
  const startSlope = index === 0 ? 0 : ((end[1] - previous[1]) / (end[0] - previous[0])) * span
  const endSlope = index + 1 === keys.length - 1
    ? 0
    : ((next[1] - start[1]) / (next[0] - start[0])) * span
  const depth = cubicHermite(start[1], startSlope, end[1], endSlope, local)
  return Math.min(0.13, Math.max(0.005, depth))
}

/* The swimming wave: the tail sweeps the most, the head barely moves, and the
   offset lags along the body so a travelling S-curve is visible mid-stroke. */
function fishSpineWave(progress, phase) {
  const envelope = 0.09 + 0.91 * progress ** 1.2
  return envelope * Math.sin(phase - BODY_WAVE * progress)
}

function buildFishSpine(fish, length) {
  const amplitude = length * (fish.swimAmplitude ?? 0.058)
  const depthScale = fish.bodyDepthScale ?? 1
  const points = []

  for (let index = 0; index <= BODY_SAMPLES; index += 1) {
    const progress = index / BODY_SAMPLES
    points.push({
      progress,
      x: (SNOUT_X - BODY_SPAN * progress) * length,
      y: amplitude * fishSpineWave(progress, fish.tailPhase),
      halfDepth: length * fishBodyHalfDepth(progress) * depthScale,
    })
  }

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index]
    const previous = points[Math.max(0, index - 1)]
    const next = points[Math.min(points.length - 1, index + 1)]
    let tangentX = next.x - previous.x
    let tangentY = next.y - previous.y
    const magnitude = Math.hypot(tangentX, tangentY) || 1
    tangentX /= magnitude
    tangentY /= magnitude
    /* Central differences make the normals follow the bent spine. The dorsal
       (up) normal is all that is needed: the ventral side is its mirror. */
    point.tangentX = tangentX
    point.tangentY = tangentY
    point.normalX = -tangentY
    point.normalY = tangentX
    point.dorsal = {
      x: point.x + point.normalX * point.halfDepth,
      y: point.y + point.normalY * point.halfDepth,
    }
    point.ventral = {
      x: point.x - point.normalX * point.halfDepth,
      y: point.y - point.normalY * point.halfDepth,
    }
  }

  return points
}

/* Quadratic midpoint smoothing keeps the sampled silhouette smooth even when a
   fish is inspected at several times its rendered size. */
function traceSmoothSegment(target, points, startWithMove) {
  if (points.length === 0) return
  if (startWithMove) target.moveTo(points[0].x, points[0].y)
  else target.lineTo(points[0].x, points[0].y)
  for (let index = 1; index < points.length - 1; index += 1) {
    const point = points[index]
    const next = points[index + 1]
    target.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2)
  }
  const last = points[points.length - 1]
  target.lineTo(last.x, last.y)
}

function buildBodyPath(spine, length) {
  const dorsal = spine.map((point) => point.dorsal)
  const ventral = spine.map((point) => point.ventral).reverse()
  const tail = spine[spine.length - 1]
  const path = new Path2D()

  traceSmoothSegment(path, dorsal, true)
  /* A short round peduncle cap instead of a point: the tail fin then reads as
     a joint rather than a triangle glued onto the body. */
  path.quadraticCurveTo(tail.x - length * 0.006, tail.y, ventral[0].x, ventral[0].y)
  traceSmoothSegment(path, ventral, false)
  /* Rounded snout: the outline bulges forward past the last spine sample and
     closes without a flat cut at the mouth. */
  path.quadraticCurveTo(
    length * (SNOUT_X + 0.005),
    spine[0].y,
    dorsal[0].x,
    dorsal[0].y,
  )
  path.closePath()
  return path
}

function drawCaudalFin(context, fish, spine, length) {
  const palette = fish.palette
  const tail = spine[spine.length - 1]
  const direction = Math.atan2(tail.tangentY, tail.tangentX)
  /* The fin trails the peduncle slightly; that lag is what makes a tail beat
     look like water pushing back on the fin instead of a rigid hinge. */
  const lag = Math.sin(fish.tailPhase - BODY_WAVE - 0.5) * 0.12
  const halfDepth = length * 0.032 * (fish.bodyDepthScale ?? 1)

  context.save()
  context.translate(tail.x, tail.y)
  context.rotate(direction + lag)
  /* Tuck the fin root into the peduncle so no dark seam opens at the joint. */
  context.translate(-length * 0.014, 0)

  /* Design frame: +x points away from the body and +y is dorsal. The fork is
     shallow with pointed lobes, which keeps it a fin instead of a fan. */
  const fin = new Path2D()
  fin.moveTo(0, halfDepth)
  fin.bezierCurveTo(length * 0.02, length * 0.058, length * 0.07, length * 0.092, length * 0.148, length * 0.108)
  fin.bezierCurveTo(length * 0.164, length * 0.112, length * 0.17, length * 0.104, length * 0.165, length * 0.092)
  fin.bezierCurveTo(length * 0.146, length * 0.062, length * 0.126, length * 0.034, length * 0.104, length * 0.008)
  fin.bezierCurveTo(length * 0.127, -length * 0.028, length * 0.147, -length * 0.056, length * 0.16, -length * 0.082)
  fin.bezierCurveTo(length * 0.167, -length * 0.094, length * 0.162, -length * 0.102, length * 0.147, -length * 0.098)
  fin.bezierCurveTo(length * 0.08, -length * 0.073, length * 0.022, -length * 0.048, 0, -halfDepth)
  fin.closePath()

  const membrane = context.createLinearGradient(0, 0, length * 0.17, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.84))
  membrane.addColorStop(0.55, withAlpha(palette.fin, 0.64))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.4))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill(fin)
  context.strokeStyle = withAlpha(palette.finEdge, 0.12)
  context.lineWidth = Math.max(0.4, length * 0.008)
  context.stroke(fin)

  if (length >= 24) {
    /* Rays stay inside the membrane, so they read as fin structure rather
       than as a wire fan floating behind the fish. */
    const rayFade = context.createLinearGradient(0, 0, length * 0.17, 0)
    rayFade.addColorStop(0, withAlpha(palette.finEdge, 0.32))
    rayFade.addColorStop(1, withAlpha(palette.finEdge, 0.03))
    context.clip(fin)
    context.globalAlpha = fish.opacity * 0.5
    context.strokeStyle = rayFade
    context.lineWidth = Math.max(0.32, length * 0.006)
    for (let ray = 1; ray <= 9; ray += 1) {
      const spread = (ray / 10) * 2 - 1
      context.beginPath()
      context.moveTo(length * 0.012, spread * halfDepth * 0.55)
      context.quadraticCurveTo(
        length * 0.12,
        spread * length * 0.07,
        length * 0.168,
        spread * length * 0.104,
      )
      context.stroke()
    }
  }

  context.restore()
}

function drawDorsalFin(context, fish, spine, length) {
  const palette = fish.palette
  const from = Math.round(0.55 * BODY_SAMPLES)
  const to = Math.round(0.75 * BODY_SAMPLES)
  const height = length * 0.14
  const base = []
  const edge = []
  for (let index = from; index <= to; index += 1) {
    const point = spine[index]
    const progress = (index - from) / (to - from)
    /* Zero at both ends of the base, tallest in the rear third, and swept back
       along the body tangent so a turning fish keeps the fin attached. */
    const shape = Math.sin(Math.PI * Math.min(1, progress ** 1.35)) ** 0.85
    base.push({
      x: point.dorsal.x - point.normalX * length * 0.008,
      y: point.dorsal.y - point.normalY * length * 0.008,
    })
    const sway = Math.sin(fish.tailPhase - 0.6) * length * 0.005 * shape
    edge.push({
      x: point.dorsal.x + point.normalX * height * shape + point.tangentX * (length * 0.02 * shape + sway),
      y: point.dorsal.y + point.normalY * height * shape + point.tangentY * (length * 0.02 * shape + sway),
    })
  }

  context.beginPath()
  traceSmoothSegment(context, base, true)
  traceSmoothSegment(context, edge.slice().reverse(), false)
  context.closePath()

  const membrane = context.createLinearGradient(0, base[0].y, 0, base[0].y - height)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.74))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.36))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill()
  context.strokeStyle = withAlpha(palette.finEdge, 0.12)
  context.lineWidth = Math.max(0.35, length * 0.007)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.22
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.beginPath()
  traceSmoothSegment(context, base, true)
  context.stroke()
  /* The trailing ray is the firmest, and the rays fade toward the outer edge. */
  context.globalAlpha = fish.opacity * 0.5
  context.strokeStyle = withAlpha(palette.finEdge, 0.42)
  context.beginPath()
  context.moveTo(edge[edge.length - 1].x, edge[edge.length - 1].y)
  context.lineTo(base[base.length - 1].x, base[base.length - 1].y)
  context.stroke()

  if (length >= 24) {
    context.globalAlpha = fish.opacity * 0.2
    context.strokeStyle = withAlpha(palette.finEdge, 0.85)
    context.lineWidth = Math.max(0.3, length * 0.006)
    for (let ray = 1; ray <= 6; ray += 1) {
      const position = Math.round((ray / 7) * (base.length - 1))
      context.beginPath()
      context.moveTo(base[position].x, base[position].y)
      context.lineTo(edge[position].x, edge[position].y)
      context.stroke()
    }
  }
}

function drawAnalFin(context, fish, spine, length) {
  const palette = fish.palette
  const from = Math.round(0.72 * BODY_SAMPLES)
  const to = Math.round(0.9 * BODY_SAMPLES)
  const height = length * 0.1
  const base = []
  const edge = []
  for (let index = from; index <= to; index += 1) {
    const point = spine[index]
    const progress = (index - from) / (to - from)
    const shape = Math.sin(Math.PI * Math.min(1, progress ** 1.3)) ** 0.85
    base.push({
      x: point.ventral.x + point.normalX * length * 0.008,
      y: point.ventral.y + point.normalY * length * 0.008,
    })
    const sway = Math.sin(fish.tailPhase - 0.6) * length * 0.004 * shape
    edge.push({
      x: point.ventral.x - point.normalX * height * shape + point.tangentX * (length * 0.012 * shape + sway),
      y: point.ventral.y - point.normalY * height * shape + point.tangentY * (length * 0.012 * shape + sway),
    })
  }

  context.beginPath()
  traceSmoothSegment(context, base, true)
  traceSmoothSegment(context, edge.slice().reverse(), false)
  context.closePath()

  const membrane = context.createLinearGradient(0, base[0].y, 0, base[0].y + height)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.7))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.32))
  context.globalAlpha = fish.opacity
  context.fillStyle = membrane
  context.fill()
  context.strokeStyle = withAlpha(palette.finEdge, 0.1)
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.beginPath()
  traceSmoothSegment(context, base, true)
  context.stroke()
}

function drawPelvicFin(context, fish, spine, length) {
  const palette = fish.palette
  const anchor = spine[Math.round(0.45 * BODY_SAMPLES)]
  context.save()
  context.translate(
    anchor.ventral.x + anchor.normalX * length * 0.008,
    anchor.ventral.y + anchor.normalY * length * 0.008,
  )
  context.rotate(Math.PI * 0.74 + Math.sin(fish.tailPhase * 1.2) * 0.08)
  context.beginPath()
  context.moveTo(0, 0)
  context.quadraticCurveTo(length * 0.03, length * 0.02, length * 0.072, length * 0.006)
  context.quadraticCurveTo(length * 0.048, -length * 0.012, 0, 0)
  context.closePath()
  const membrane = context.createLinearGradient(0, 0, length * 0.072, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.68))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.3))
  context.globalAlpha = fish.opacity * 0.8
  context.fillStyle = membrane
  context.fill()
  context.globalAlpha = fish.opacity * 0.18
  context.strokeStyle = withAlpha(palette.finEdge, 0.6)
  context.lineWidth = Math.max(0.26, length * 0.004)
  context.stroke()
  context.restore()
}

function drawPectoralFin(context, fish, spine, length) {
  const palette = fish.palette
  const anchor = spine[Math.round(0.25 * BODY_SAMPLES)]
  const scull = Math.sin(fish.tailPhase * 1.15 + 0.6) * 0.22
  context.save()
  context.translate(anchor.x - anchor.normalX * anchor.halfDepth * 0.25, anchor.y - anchor.normalY * anchor.halfDepth * 0.25)
  context.rotate(Math.PI - 0.5 + scull)

  context.beginPath()
  context.moveTo(0, 0)
  context.quadraticCurveTo(length * 0.05, length * 0.03, length * 0.098, length * 0.008)
  context.quadraticCurveTo(length * 0.054, -length * 0.009, 0, 0)
  context.closePath()

  const membrane = context.createLinearGradient(0, 0, length * 0.098, 0)
  membrane.addColorStop(0, withAlpha(palette.fin, 0.56))
  membrane.addColorStop(1, withAlpha(palette.finEdge, 0.22))
  context.globalAlpha = fish.opacity * 0.85
  context.fillStyle = membrane
  context.fill()
  context.globalAlpha = fish.opacity * 0.16
  context.strokeStyle = withAlpha(palette.finEdge, 0.9)
  context.lineWidth = Math.max(0.3, length * 0.006)
  context.beginPath()
  context.moveTo(length * 0.012, 0)
  context.quadraticCurveTo(length * 0.048, length * 0.016, length * 0.09, length * 0.006)
  context.moveTo(length * 0.012, 0)
  context.quadraticCurveTo(length * 0.048, -length * 0.005, length * 0.088, length * 0.002)
  context.stroke()
  context.restore()
}

function drawFishBody(context, fish, spine, bodyPath, length) {
  const palette = fish.palette
  const depth = length * 0.112 * (fish.bodyDepthScale ?? 1)
  const gradient = context.createLinearGradient(0, -depth, 0, depth)
  gradient.addColorStop(0, palette.back)
  gradient.addColorStop(0.42, palette.upper)
  gradient.addColorStop(0.7, palette.flank)
  gradient.addColorStop(0.86, palette.sheen)
  gradient.addColorStop(1, palette.belly)

  context.save()
  context.globalAlpha = Math.min(1, (fish.baseOpacity ?? fish.opacity) + 0.3) * (fish.fade ?? 1)
  context.fillStyle = gradient
  context.fill(bodyPath)

  /* A soft specular patch on the upper flank and a grounded belly shadow give
     the flat outline the volume of a lit, rounded body. */
  context.clip(bodyPath)
  const sheen = context.createRadialGradient(
    length * 0.04, -depth * 0.5, 0,
    length * 0.04, -depth * 0.5, length * 0.36,
  )
  sheen.addColorStop(0, withAlpha(palette.sheen, 0.1))
  sheen.addColorStop(1, withAlpha(palette.sheen, 0))
  context.fillStyle = sheen
  context.fillRect(-length * 0.8, -length * 0.2, length * 1.6, length * 0.4)

  const shadow = context.createLinearGradient(0, depth * 0.15, 0, depth)
  shadow.addColorStop(0, withAlpha(palette.detail, 0))
  shadow.addColorStop(1, withAlpha(palette.detail, 0.16))
  context.fillStyle = shadow
  context.fillRect(-length * 0.8, -length * 0.2, length * 1.6, length * 0.6)
  context.restore()

  /* A faint dark contour separates the countershaded body from bright water,
     the way ambient occlusion does around a real fish. */
  context.save()
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.4, length * 0.009)
  context.stroke(bodyPath)
  context.restore()

  /* A thin rim light picks the back out of the dark water; the belly instead
     sinks into the background, exactly like a countershaded fish. */
  context.save()
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.rim
  context.lineWidth = Math.max(0.4, length * 0.006)
  context.lineCap = 'round'
  context.beginPath()
  traceSmoothSegment(context, spine.map((point) => point.dorsal), true)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.35, length * 0.007)
  context.beginPath()
  traceSmoothSegment(context, spine.map((point) => point.ventral), true)
  context.stroke()
  context.restore()
}

function drawFishBars(context, fish, spine, bodyPath, length) {
  const barColor = fish.palette.bar
  if (barColor === undefined || fish.bars === undefined) return

  context.save()
  context.clip(bodyPath)
  context.strokeStyle = withAlpha(barColor, 0.6)
  context.lineWidth = Math.max(0.9, length * 0.028)
  context.globalAlpha = fish.opacity * 0.55
  for (const progress of fish.bars) {
    const index = Math.min(BODY_SAMPLES - 2, Math.max(2, Math.round(progress * BODY_SAMPLES)))
    const point = spine[index]
    const halfDepth = point.halfDepth * 0.95
    context.beginPath()
    context.moveTo(point.x + point.normalX * halfDepth, point.y + point.normalY * halfDepth)
    context.quadraticCurveTo(
      point.x + point.tangentX * length * 0.012,
      point.y + point.tangentY * length * 0.012,
      point.x - point.normalX * halfDepth,
      point.y - point.normalY * halfDepth,
    )
    context.stroke()
  }
  context.restore()
}

function drawFishDetails(context, fish, spine, length) {
  const palette = fish.palette
  const line = Math.max(0.45, length * 0.012)
  context.lineCap = 'round'
  context.lineJoin = 'round'

  /* Operculum: a curved plate edge just behind the head, forward of the
     pectoral fin, so the head reads as separate from the trunk. */
  const coverTop = spine[Math.round(0.225 * BODY_SAMPLES)].dorsal
  const coverBottom = spine[Math.round(0.27 * BODY_SAMPLES)].ventral
  context.globalAlpha = fish.opacity * 0.3
  context.strokeStyle = palette.detail
  context.lineWidth = line * 0.7
  context.beginPath()
  context.moveTo(coverTop.x, coverTop.y)
  context.quadraticCurveTo(length * 0.265, spine[Math.round(0.245 * BODY_SAMPLES)].y, coverBottom.x, coverBottom.y)
  context.stroke()

  /* A thin plate highlight just behind that seam suggests a lit operculum. */
  context.globalAlpha = fish.opacity * 0.1
  context.strokeStyle = palette.rim
  context.lineWidth = line * 0.55
  context.beginPath()
  context.moveTo(length * 0.255, coverTop.y + length * 0.004)
  context.quadraticCurveTo(length * 0.272, spine[Math.round(0.245 * BODY_SAMPLES)].y, length * 0.242, coverBottom.y - length * 0.004)
  context.stroke()

  /* A soft lateral band along the flank: minnows read as banded fish far
     more readily than as a plain metallic capsule. */
  const band = []
  for (let index = 4; index <= BODY_SAMPLES - 2; index += 2) {
    const point = spine[index]
    band.push({
      x: point.x + point.normalX * point.halfDepth * 0.12,
      y: point.y + point.normalY * point.halfDepth * 0.12,
    })
  }
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.8, length * 0.026)
  context.beginPath()
  traceSmoothSegment(context, band, true)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.28
  context.lineWidth = Math.max(0.32, length * 0.007)
  context.beginPath()
  traceSmoothSegment(context, band, true)
  context.stroke()

  /* Lateral line: the faint seam that runs from the gill to the tail. */
  const lateral = []
  for (let index = Math.round(0.36 * BODY_SAMPLES); index <= BODY_SAMPLES - 3; index += 2) {
    const point = spine[index]
    lateral.push({
      x: point.x + point.normalX * point.halfDepth * 0.2,
      y: point.y + point.normalY * point.halfDepth * 0.2,
    })
  }
  context.globalAlpha = fish.opacity * 0.2
  context.strokeStyle = withAlpha(palette.detail, 0.8)
  context.lineWidth = line * 0.7
  context.beginPath()
  traceSmoothSegment(context, lateral, true)
  context.stroke()

  /* Mouth: the jaws meet at the very tip of the snout, with a short crease
     that opens slightly downward instead of a cartoon smile. */
  const snout = spine[1]
  context.globalAlpha = fish.opacity * 0.72
  context.strokeStyle = palette.detail
  context.lineWidth = line * 0.95
  context.beginPath()
  context.moveTo(length * 0.489, snout.y - length * 0.004)
  context.quadraticCurveTo(length * 0.501, snout.y + length * 0.006, length * 0.474, snout.y + length * 0.017)
  context.stroke()
  context.globalAlpha = fish.opacity * 0.14
  context.strokeStyle = palette.rim
  context.lineWidth = line * 0.7
  context.beginPath()
  context.moveTo(length * 0.492, snout.y + length * 0.006)
  context.quadraticCurveTo(length * 0.489, snout.y + length * 0.013, length * 0.478, snout.y + length * 0.018)
  context.stroke()

  /* A short gape shows the predator actually swallowing the smaller fish. */
  if ((fish.gulp ?? 0) > 0.35) {
    context.globalAlpha = fish.opacity * 0.72
    context.fillStyle = palette.detail
    context.beginPath()
    context.ellipse(
      length * 0.474,
      snout.y + length * 0.004,
      length * 0.045,
      length * 0.027 * (fish.gulp ?? 1),
      0,
      0,
      TAU,
    )
    context.fill()
  }
}

function drawFishEye(context, fish, spine, length) {
  const palette = fish.palette
  const head = spine[Math.round(0.1 * BODY_SAMPLES)]
  const eyeX = head.x
  const eyeY = head.y + head.normalY * head.halfDepth * 0.24
  const radius = Math.max(0.8, length * 0.026)

  /* Dark socket, dark eyeball, thin bright iris ring and one specular dot:
     a real fish eye is mostly black, never a white ball with a black pupil. */
  context.save()
  context.globalAlpha = fish.opacity * 0.28
  context.fillStyle = withAlpha(palette.detail, 0.5)
  context.beginPath()
  context.arc(eyeX, eyeY, radius * 1.14, 0, TAU)
  context.fill()

  context.globalAlpha = Math.min(1, (fish.baseOpacity ?? fish.opacity) + 0.2) * (fish.fade ?? 1)
  context.fillStyle = palette.eye
  context.beginPath()
  context.arc(eyeX, eyeY, radius, 0, TAU)
  context.fill()

  context.strokeStyle = withAlpha(palette.iris, 0.2)
  context.lineWidth = Math.max(0.35, radius * 0.22)
  context.beginPath()
  context.arc(eyeX, eyeY, radius * 0.7, 0, TAU)
  context.stroke()

  context.fillStyle = 'rgba(255, 255, 255, 0.62)'
  context.beginPath()
  context.arc(eyeX + radius * 0.26, eyeY - radius * 0.3, Math.max(0.28, radius * 0.2), 0, TAU)
  context.fill()
  context.restore()
}

function wrapAngle(angle) {
  let wrapped = angle
  while (wrapped > Math.PI) wrapped -= TAU
  while (wrapped < -Math.PI) wrapped += TAU
  return wrapped
}

/**
 * Maps a travel heading onto the visible pose of a side-view sprite. Leftward
 * travel is mirrored so the fish stays upright, and the visible pitch is the
 * travel direction itself: the nose always points where the fish is going,
 * including steep climbs and dives.
 */
export function fishVisualPose(heading) {
  const normalized = wrapAngle(heading)
  const mirrored = Math.cos(normalized) < 0
  return {
    mirrored,
    rotation: mirrored ? wrapAngle(normalized - Math.PI) : normalized,
  }
}

/** Draws one lit, anatomically shaded fish in local screen coordinates. */
export function drawOfficialFish(context, fish) {
  const fade = fish.fade ?? 1
  if (fade <= 0.01) return
  const visual = fade < 0.999 ? { ...fish, opacity: fish.opacity * fade, baseOpacity: fish.opacity, fade } : fish
  const length = visual.length
  const spine = buildFishSpine(visual, length)
  const bodyPath = buildBodyPath(spine, length)
  const bank = Math.min(0.6, Math.max(-0.6, (visual.turnRate ?? 0) * 0.11))
  const gulp = visual.gulp ?? 0
  const pose = fishVisualPose(visual.heading)
  const yaw = Math.sin(visual.tailPhase - 0.7) * 0.045

  context.save()
  context.translate(visual.x, visual.y)
  context.rotate(pose.rotation + yaw)
  if (pose.mirrored) context.scale(-1, 1)
  if (visual.bellyUp) context.scale(1, -1)
  /* Turning fish roll away from the camera, so the body foreshortens before
     the heading has finished changing. */
  if (bank !== 0) context.scale(1, 1 - Math.abs(bank) * 0.18)
  /* Swallowing a smaller fish gives the body one short forward gulp. */
  if (gulp > 0.01) context.scale(1 + gulp * 0.06, 1 - gulp * 0.05)
  context.translate(0, Math.sin(visual.tailPhase + 0.9) * length * 0.006)

  drawSprintWake(context, visual, length)
  drawCaudalFin(context, visual, spine, length)
  drawFishBody(context, visual, spine, bodyPath, length)
  drawFishBars(context, visual, spine, bodyPath, length)
  drawDorsalFin(context, visual, spine, length)
  drawAnalFin(context, visual, spine, length)
  drawPelvicFin(context, visual, spine, length)
  drawFishDetails(context, visual, spine, length)
  drawPectoralFin(context, visual, spine, length)
  drawFishEye(context, visual, spine, length)
  context.restore()
}


function drawSprintWake(context, fish, length) {
  if (fish.cruiseSpeed === undefined || fish.speed <= fish.cruiseSpeed * 1.15) return
  const intensity = Math.min(1.4, fish.speed / fish.cruiseSpeed - 1)
  const palette = fish.palette
  context.save()
  context.globalAlpha = Math.min(0.4, intensity * 0.3)
  context.strokeStyle = palette.finEdge
  context.lineWidth = Math.max(0.5, length * 0.01)
  context.lineCap = 'round'
  for (let line = 0; line < 3; line += 1) {
    const offset = (line - 1) * length * 0.07
    context.beginPath()
    context.moveTo(-length * 0.56, offset)
    context.lineTo(-length * (0.72 + line * 0.06), offset * 0.45)
    context.stroke()
  }
  context.restore()
}

/** Small drifting prawn: curved shell, tail fan and long antennae. */
export function drawShrimp(context, shrimp, palette) {
  const length = shrimp.size
  context.save()
  context.translate(shrimp.x, shrimp.y)
  context.rotate(shrimp.heading)

  context.globalAlpha = 0.9
  context.fillStyle = palette.body
  context.beginPath()
  context.moveTo(length * 0.4, -length * 0.06)
  context.bezierCurveTo(length * 0.34, -length * 0.22, length * 0.08, -length * 0.26, -length * 0.12, -length * 0.18)
  context.bezierCurveTo(-length * 0.32, -length * 0.1, -length * 0.42, -length * 0.02, -length * 0.42, length * 0.04)
  context.bezierCurveTo(-length * 0.24, length * 0.16, length * 0.04, length * 0.22, length * 0.22, length * 0.1)
  context.bezierCurveTo(length * 0.34, length * 0.04, length * 0.42, -length * 0.02, length * 0.4, -length * 0.06)
  context.closePath()
  context.fill()
  context.strokeStyle = palette.shell
  context.globalAlpha = 0.35
  context.lineWidth = Math.max(0.3, length * 0.02)
  context.stroke()

  /* Tail fan. */
  context.globalAlpha = 0.7
  context.fillStyle = palette.shell
  context.beginPath()
  context.moveTo(-length * 0.38, length * 0.02)
  context.lineTo(-length * 0.68, -length * 0.16)
  context.lineTo(-length * 0.6, length * 0.02)
  context.lineTo(-length * 0.66, length * 0.16)
  context.closePath()
  context.fill()

  /* Walking legs. */
  context.globalAlpha = 0.55
  context.strokeStyle = palette.detail
  context.lineWidth = Math.max(0.3, length * 0.018)
  for (let leg = 0; leg < 3; leg += 1) {
    const x = length * (0.14 - leg * 0.13)
    context.beginPath()
    context.moveTo(x, length * 0.15)
    context.lineTo(x - length * 0.05, length * 0.36)
    context.stroke()
  }

  /* Long feelers. */
  context.globalAlpha = 0.6
  context.strokeStyle = palette.shell
  context.lineWidth = Math.max(0.3, length * 0.02)
  context.beginPath()
  context.moveTo(length * 0.36, -length * 0.04)
  context.quadraticCurveTo(length * 0.7, -length * 0.3, length * 0.82, -length * 0.08)
  context.moveTo(length * 0.36, length * 0.02)
  context.quadraticCurveTo(length * 0.62, length * 0.26, length * 0.5, length * 0.34)
  context.stroke()

  /* Dark eye and a bright glint. */
  context.globalAlpha = 0.95
  context.fillStyle = palette.eye
  context.beginPath()
  context.arc(length * 0.28, -length * 0.05, Math.max(0.55, length * 0.075), 0, TAU)
  context.fill()
  context.globalAlpha = 0.8
  context.fillStyle = palette.shell
  context.beginPath()
  context.arc(length * 0.305, -length * 0.075, Math.max(0.2, length * 0.024), 0, TAU)
  context.fill()
  context.restore()
}

/** A belly-up predator carcass that the school can scavenge. */
export function drawFishCorpse(context, corpse) {
  const biomassRatio = corpse.maxBiomass > 0 ? corpse.biomass / corpse.maxBiomass : 0
  drawOfficialFish(context, {
    x: corpse.x,
    y: corpse.y + Math.sin(corpse.phase) * 1.2,
    heading: corpse.heading + Math.sin(corpse.phase * 0.7) * 0.04,
    length: corpse.length * (0.62 + 0.38 * biomassRatio),
    tailPhase: 0,
    speed: 0,
    cruiseSpeed: 0,
    turnRate: 0,
    gulp: 0,
    bellyUp: true,
    opacity: 0.5 + 0.35 * biomassRatio,
    palette: corpse.palette,
    bars: corpse.bars,
    bodyDepthScale: 1.32,
    swimAmplitude: 0,
  })
}
