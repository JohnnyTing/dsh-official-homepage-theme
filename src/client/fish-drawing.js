function drawFishTail(context, fish, length, bodyHeight) {
  const tailAngle = Math.sin(fish.tailPhase) * 0.34

  context.save()
  context.translate(-length * 0.34, 0)
  context.rotate(tailAngle * 0.48)
  context.globalAlpha = fish.opacity * 0.88
  context.fillStyle = fish.color

  // The narrow caudal peduncle moves with the body before the fin bends again.
  context.beginPath()
  context.moveTo(length * 0.03, -bodyHeight * 0.3)
  context.bezierCurveTo(-length * 0.08, -bodyHeight * 0.22, -length * 0.15, -bodyHeight * 0.16, -length * 0.2, -bodyHeight * 0.1)
  context.lineTo(-length * 0.2, bodyHeight * 0.1)
  context.bezierCurveTo(-length * 0.15, bodyHeight * 0.16, -length * 0.08, bodyHeight * 0.22, length * 0.03, bodyHeight * 0.3)
  context.closePath()
  context.fill()

  context.translate(-length * 0.19, 0)
  context.rotate(tailAngle * 0.72)

  // Two asymmetric lobes and a clear fork make the tail read as a real fin.
  context.beginPath()
  context.moveTo(0, 0)
  context.bezierCurveTo(-length * 0.08, -length * 0.08, -length * 0.2, -length * 0.3, -length * 0.34, -length * 0.27)
  context.bezierCurveTo(-length * 0.3, -length * 0.12, -length * 0.24, -length * 0.04, -length * 0.14, 0)
  context.bezierCurveTo(-length * 0.24, length * 0.04, -length * 0.3, length * 0.12, -length * 0.34, length * 0.27)
  context.bezierCurveTo(-length * 0.2, length * 0.3, -length * 0.08, length * 0.08, 0, 0)
  context.closePath()
  context.fill()

  context.globalAlpha = fish.opacity * 0.28
  context.strokeStyle = fish.accentColor
  context.lineWidth = Math.max(0.7, length * 0.012)
  context.beginPath()
  context.moveTo(-length * 0.03, 0)
  context.quadraticCurveTo(-length * 0.18, -length * 0.1, -length * 0.3, -length * 0.22)
  context.moveTo(-length * 0.03, 0)
  context.quadraticCurveTo(-length * 0.18, length * 0.1, -length * 0.3, length * 0.22)
  context.stroke()
  context.restore()
}

function drawFishRearFins(context, fish, length, bodyHeight) {
  context.fillStyle = fish.color
  context.globalAlpha = fish.opacity * 0.56

  context.beginPath()
  context.moveTo(-length * 0.12, -bodyHeight * 0.72)
  context.bezierCurveTo(-length * 0.08, -length * 0.31, length * 0.12, -length * 0.29, length * 0.17, -bodyHeight * 0.52)
  context.quadraticCurveTo(length * 0.03, -bodyHeight * 0.64, -length * 0.12, -bodyHeight * 0.72)
  context.fill()

  context.beginPath()
  context.moveTo(-length * 0.08, bodyHeight * 0.68)
  context.quadraticCurveTo(-length * 0.01, length * 0.25, length * 0.11, bodyHeight * 0.55)
  context.quadraticCurveTo(length * 0.01, bodyHeight * 0.68, -length * 0.08, bodyHeight * 0.68)
  context.fill()
}

function drawFishBody(context, fish, length, bodyHeight) {
  context.globalAlpha = fish.opacity
  context.fillStyle = fish.color
  context.shadowColor = fish.color
  context.shadowBlur = length * 0.24
  context.beginPath()
  context.moveTo(-length * 0.38, 0)
  context.bezierCurveTo(-length * 0.2, -bodyHeight * 0.96, length * 0.25, -bodyHeight * 1.05, length * 0.5, -bodyHeight * 0.08)
  context.quadraticCurveTo(length * 0.53, 0, length * 0.5, bodyHeight * 0.08)
  context.bezierCurveTo(length * 0.25, bodyHeight * 1.05, -length * 0.2, bodyHeight * 0.96, -length * 0.38, 0)
  context.fill()

  context.shadowBlur = 0
  context.globalAlpha = fish.opacity * 0.34
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.moveTo(-length * 0.2, -bodyHeight * 0.42)
  context.bezierCurveTo(length * 0.02, -bodyHeight * 0.82, length * 0.31, -bodyHeight * 0.62, length * 0.43, -bodyHeight * 0.16)
  context.bezierCurveTo(length * 0.19, -bodyHeight * 0.42, -length * 0.02, -bodyHeight * 0.2, -length * 0.2, -bodyHeight * 0.42)
  context.fill()
}

function drawFishPectoralFin(context, fish, length, bodyHeight) {
  const finWave = Math.sin(fish.tailPhase + Math.PI * 0.35) * length * 0.025
  context.globalAlpha = fish.opacity * 0.58
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.moveTo(length * 0.04, bodyHeight * 0.12)
  context.bezierCurveTo(-length * 0.04, bodyHeight * 0.38, -length * 0.13, length * 0.24 + finWave, length * 0.12, bodyHeight * 0.47)
  context.quadraticCurveTo(length * 0.18, bodyHeight * 0.25, length * 0.04, bodyHeight * 0.12)
  context.fill()

  context.globalAlpha = fish.opacity * 0.3
  context.strokeStyle = fish.detailColor
  context.lineWidth = Math.max(0.65, length * 0.01)
  context.beginPath()
  context.moveTo(length * 0.055, bodyHeight * 0.17)
  context.quadraticCurveTo(length * 0.01, bodyHeight * 0.42, -length * 0.07, length * 0.18 + finWave)
  context.stroke()
}

function drawFishFaceAndDetails(context, fish, length, bodyHeight) {
  const detailWidth = Math.max(0.8, length * 0.014)
  context.shadowBlur = 0
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.strokeStyle = fish.detailColor
  context.lineWidth = detailWidth

  // Gill cover and lateral line keep the head distinct from the body.
  context.globalAlpha = fish.opacity * 0.64
  context.beginPath()
  context.moveTo(length * 0.22, -bodyHeight * 0.52)
  context.quadraticCurveTo(length * 0.14, 0, length * 0.22, bodyHeight * 0.55)
  context.moveTo(length * 0.14, bodyHeight * 0.25)
  context.quadraticCurveTo(-length * 0.08, bodyHeight * 0.08, -length * 0.29, bodyHeight * 0.12)
  context.stroke()

  // A short curved mouth remains visible without turning the fish into a cartoon.
  context.globalAlpha = fish.opacity * 0.82
  context.beginPath()
  context.moveTo(length * 0.42, bodyHeight * 0.08)
  context.quadraticCurveTo(length * 0.48, bodyHeight * 0.2, length * 0.505, bodyHeight * 0.08)
  context.stroke()

  const eyeX = length * 0.32
  const eyeY = -bodyHeight * 0.28
  const eyeRadius = Math.max(2.1, length * 0.041)
  context.globalAlpha = Math.min(1, fish.opacity + 0.24)
  context.fillStyle = fish.accentColor
  context.beginPath()
  context.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2)
  context.fill()

  context.fillStyle = fish.detailColor
  context.beginPath()
  context.arc(eyeX + eyeRadius * 0.18, eyeY + eyeRadius * 0.08, eyeRadius * 0.56, 0, Math.PI * 2)
  context.fill()

  context.globalAlpha = 0.92
  context.fillStyle = '#ffffff'
  context.beginPath()
  context.arc(eyeX + eyeRadius * 0.37, eyeY - eyeRadius * 0.22, Math.max(0.55, eyeRadius * 0.18), 0, Math.PI * 2)
  context.fill()
}

/** Draws one detailed, glowing fish in local screen coordinates. */
export function drawOfficialFish(context, fish) {
  const length = fish.length
  const bodyHeight = length * 0.19

  context.save()
  context.translate(fish.x, fish.y)
  context.rotate(fish.heading)
  drawFishTail(context, fish, length, bodyHeight)
  drawFishRearFins(context, fish, length, bodyHeight)
  drawFishBody(context, fish, length, bodyHeight)
  drawFishPectoralFin(context, fish, length, bodyHeight)
  drawFishFaceAndDetails(context, fish, length, bodyHeight)
  context.restore()
}
