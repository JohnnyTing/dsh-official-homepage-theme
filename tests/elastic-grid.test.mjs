import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'
import { OFFICIAL_ELASTIC_GRID_PROFILE } from '../src/client/elastic-grid-profile.js'
import { advanceElasticGrid, createElasticGridNodes } from '../src/client/elastic-grid.js'

const root = resolve(import.meta.dirname, '..')

test('elastic grid profile keeps the homepage baseline and performance limits', () => {
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.spacing, 90)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.pointRadius, 1)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.pointOpacity, 0.08)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.activePointRadius, 2.2)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.activePointOpacity, 0.28)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.pointerRadius, 140)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.fishRadius, 90)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.fishRepulsion, 1.4)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.spring, 0.05)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.damping, 0.85)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.frameInterval, 1000 / 30)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.maxPixelRatio, 2)
  assert.equal(OFFICIAL_ELASTIC_GRID_PROFILE.resizeDelay, 150)
})

test('grid nodes are evenly spaced and centered in the viewport', () => {
  const grid = createElasticGridNodes(1000, 700)
  assert.equal(grid.columns, 12)
  assert.equal(grid.rows, 8)
  assert.equal(grid.nodes[0].baseX, 5)
  assert.equal(grid.nodes.at(-1).baseX, 995)
  assert.equal(grid.nodes[0].baseY, 35)
  assert.equal(grid.nodes.at(-1).baseY, 665)
})

test('nearby nodes repel, stay bounded and spring back after the pointer leaves', () => {
  const node = { baseX: 100, baseY: 100, x: 100, y: 100, vx: 0, vy: 0 }
  const sources = [{
    kind: 'pointer',
    x: 0.45,
    y: 0.5,
    active: true,
    gridRadius: 140,
    gridStrength: 2.8,
  }]

  for (let index = 0; index < 80; index += 1) {
    advanceElasticGrid([node], sources, 200, 200)
  }
  assert.ok(node.x > node.baseX)
  assert.ok(Math.hypot(node.x - node.baseX, node.y - node.baseY) <= OFFICIAL_ELASTIC_GRID_PROFILE.maxDisplacement)

  sources[0].active = false
  for (let index = 0; index < 240; index += 1) {
    advanceElasticGrid([node], sources, 200, 200)
  }
  assert.ok(Math.abs(node.x - node.baseX) < 0.01)
  assert.ok(Math.abs(node.vx) < 0.01)
})

test('a pointer exactly on a node does not create a direction-flipping oscillation', () => {
  const node = { baseX: 100, baseY: 100, x: 100, y: 100, vx: 0, vy: 0 }
  const activity = advanceElasticGrid(
    [node],
    [{
      kind: 'pointer',
      x: 0.5,
      y: 0.5,
      active: true,
      gridRadius: 140,
      gridStrength: 2.8,
    }],
    200,
    200,
  )

  assert.equal(node.x, node.baseX)
  assert.equal(node.vx, 0)
  assert.equal(activity.maxMovement, 0)
})

test('pointer and fish sources accumulate bounded grid repulsion', () => {
  const node = { baseX: 100, baseY: 100, x: 100, y: 100, vx: 0, vy: 0 }
  const sources = [
    { kind: 'pointer', x: 0.4, y: 0.5, active: true, gridRadius: 140, gridStrength: 2.8 },
    { kind: 'fish', x: 0.45, y: 0.5, active: true, gridRadius: 90, gridStrength: 1.4 },
    { kind: 'fish', x: 0.5, y: 0.5, active: false, gridRadius: 90, gridStrength: 1.4 },
  ]

  for (let index = 0; index < 100; index += 1) {
    advanceElasticGrid([node], sources, 200, 200)
  }

  assert.ok(node.x > node.baseX)
  assert.ok(node.x - node.baseX <= OFFICIAL_ELASTIC_GRID_PROFILE.maxDisplacement)
})

test('elastic grid source owns its independent canvas and complete lifecycle', async () => {
  const source = await readFile(resolve(root, 'src/client/elastic-grid.js'), 'utf8')
  assert.match(source, /getContext\('2d'\)/)
  assert.match(source, /IntersectionObserver/)
  assert.match(source, /requestAnimationFrame/)
  assert.match(source, /window\.setTimeout[\s\S]*profile\.resizeDelay/)
  assert.match(source, /window\.clearTimeout\(resizeTimer\)/)
  assert.match(source, /window\.cancelAnimationFrame\(frame\)/)
  assert.match(source, /observer\?\.disconnect\(\)/)
  assert.match(source, /canvas\.remove\(\)/)
  assert.match(source, /\(hover: hover\) and \(pointer: fine\)/)
  assert.match(source, /interactionSources\.subscribe/)
  assert.doesNotMatch(source, /addEventListener\('pointermove'/)
})
