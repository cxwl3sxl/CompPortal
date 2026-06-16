<template>
  <canvas ref="canvasRef" class="ambient-bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
let animationId = null
let orbs = []
let mouseX = 0
let mouseY = 0

const colors = [
  'rgba(56, 189, 248, {{a}})',   // sky-400
  'rgba(125, 211, 252, {{a}})',  // sky-300
  'rgba(167, 139, 250, {{a}})',  // violet-400
  'rgba(129, 140, 248, {{a}})',  // indigo-400
  'rgba(34, 211, 238, {{a}})',   // cyan-400
  'rgba(103, 232, 249, {{a}})',  // cyan-300
  'rgba(196, 181, 253, {{a}})',  // violet-300
  'rgba(56, 189, 248, {{a}})',   // sky-400
]

function createOrbs(w, h) {
  orbs = []
  const count = 8
  for (let i = 0; i < count; i++) {
    const isLarge = i < 4
    orbs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      baseRadius: isLarge ? Math.random() * 140 + 100 : Math.random() * 80 + 40,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
      phase: Math.random() * Math.PI * 2,
      wobbleAmp: Math.random() * 30 + 15,
      wobbleSpeed: Math.random() * 0.4 + 0.2,
      pulseSpeed: Math.random() * 0.3 + 0.15,
      pulseAmp: Math.random() * 12 + 6,
      alpha: isLarge ? Math.random() * 0.08 + 0.07 : Math.random() * 0.06 + 0.04,
      alphaPulse: Math.random() * 0.3 + 0.1,
      alphaSpeed: Math.random() * 0.2 + 0.1,
      colorIdx: Math.floor(Math.random() * colors.length),
    })
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * 1.5
  canvas.height = h * 1.5
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  createOrbs(canvas.width, canvas.height)
}

function draw(ctx, w, h, time) {
  ctx.clearRect(0, 0, w, h)

  for (const orb of orbs) {
    // movement
    orb.x += orb.vx
    orb.y += orb.vy

    // wobble — sine wave on both axes for organic flow
    const wobble = Math.sin(time * orb.wobbleSpeed + orb.phase)
    orb.x += Math.cos(time * orb.wobbleSpeed * 0.7 + orb.phase) * orb.wobbleAmp * 0.02
    orb.y += wobble * orb.wobbleAmp * 0.02

    // radius pulse — gentle breathing
    const radiusPulse = 1 + Math.sin(time * orb.pulseSpeed + orb.phase) * (orb.pulseAmp / orb.baseRadius)
    const drawRadius = orb.baseRadius * radiusPulse

    // alpha pulse — fade in/out for ethereal feel
    const alphaDelta = Math.sin(time * orb.alphaSpeed + orb.phase * 1.5) * orb.alphaPulse * orb.alpha
    const drawAlpha = Math.max(0.01, orb.alpha + alphaDelta)

    // wrap around edges (teleport to opposite side)
    const margin = orb.baseRadius * 2.5
    if (orb.x < -margin) orb.x = w + margin
    if (orb.x > w + margin) orb.x = -margin
    if (orb.y < -margin) orb.y = h + margin
    if (orb.y > h + margin) orb.y = -margin

    // gentle mouse repulsion — orbs shy away from cursor
    const dx = mouseX * 1.5 - orb.x
    const dy = mouseY * 1.5 - orb.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 400 && dist > 0) {
      const force = (400 - dist) / 400 * 0.8
      orb.x -= (dx / dist) * force
      orb.y -= (dy / dist) * force
    }

    ctx.beginPath()
    ctx.arc(orb.x, orb.y, drawRadius, 0, Math.PI * 2)
    const colorStr = colors[orb.colorIdx].replace('{{a}}', drawAlpha.toFixed(4))
    ctx.fillStyle = colorStr
    ctx.fill()
  }
}

function animate(time) {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  draw(ctx, w, h, time * 0.001)
  animationId = requestAnimationFrame(animate)
}

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', onMouseMove)
  animate(0)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.ambient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  filter: blur(70px);
  -webkit-filter: blur(70px);
  will-change: transform;
  opacity: var(--ambient-opacity);
  transition: opacity 0.5s ease;
}
</style>
