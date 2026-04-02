/**
 * sounds.js — Web Audio API sound effects for Recycle Rush.
 * All sounds are synthesized; no audio files are needed.
 *
 * Exports:
 *   playMaterial(material)  — correct-drop sound matching physical material
 *   playWrong()             — descending sawtooth buzz (wrong drop)
 *   playTick()              — short blip (timer warning, ≤10 s)
 *
 * Materials: 'paper' | 'plastic' | 'metal' | 'organic' | 'ceramic' | 'mixed'
 */

let ctx = null

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return ctx
}

/**
 * Keep the AudioContext alive by resuming it on every pointerdown.
 * Using a persistent listener (not once:true) means any period of
 * browser-initiated suspension is cleared before the next drag begins,
 * so audio is always ready to schedule instantly when the drop fires.
 * pointerdown IS a trusted activation event; dragstart/drop are NOT.
 */
window.addEventListener('pointerdown', () => {
  const ac = getCtx()
  if (ac.state === 'suspended') ac.resume()
}, { capture: true })

/** Single oscillator tone with exponential decay. Synchronous schedule. */
function playTone(freq, type, startOffset, duration, gainVal = 0.25) {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ac.currentTime + startOffset)
  gain.gain.setValueAtTime(gainVal, ac.currentTime + startOffset)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startOffset + duration)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime + startOffset)
  osc.stop(ac.currentTime + startOffset + duration + 0.02)
}

// ── Material sounds ──────────────────────────────────────────────────────────

/** paper — bandpass white noise burst (soft crinkle/rustle) */
function playPaper() {
  const ac = getCtx()
  const bufferSize = Math.floor(ac.sampleRate * 0.13)
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const source = ac.createBufferSource()
  source.buffer = buffer
  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1100
  filter.Q.value = 0.7
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.38, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.13)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ac.destination)
  source.start(ac.currentTime)
  source.stop(ac.currentTime + 0.15)
}

/** plastic — hollow triangle knock (like tapping a plastic bottle) */
function playPlastic() {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(230, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(110, ac.currentTime + 0.12)
  gain.gain.setValueAtTime(0.35, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.16)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime)
  osc.stop(ac.currentTime + 0.18)
}

/** metal — inharmonic sine ping with slow decay (coin drop / metallic ring) */
function playMetal() {
  const ac = getCtx()
  const osc1 = ac.createOscillator()
  const g1 = ac.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(1600, ac.currentTime)
  osc1.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.5)
  g1.gain.setValueAtTime(0.22, ac.currentTime)
  g1.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.55)
  osc1.connect(g1)
  g1.connect(ac.destination)
  osc1.start(ac.currentTime)
  osc1.stop(ac.currentTime + 0.58)
  const osc2 = ac.createOscillator()
  const g2 = ac.createGain()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(2300, ac.currentTime)
  osc2.frequency.exponentialRampToValueAtTime(1400, ac.currentTime + 0.3)
  g2.gain.setValueAtTime(0.10, ac.currentTime)
  g2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3)
  osc2.connect(g2)
  g2.connect(ac.destination)
  osc2.start(ac.currentTime)
  osc2.stop(ac.currentTime + 0.33)
}

/** organic — low-sine soft plop (ripe fruit dropped) */
function playOrganic() {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(130, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(55, ac.currentTime + 0.11)
  gain.gain.setValueAtTime(0.42, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.14)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime)
  osc.stop(ac.currentTime + 0.16)
}

/** ceramic — crisp triangle tap with a short harmonic overlay */
function playCeramic() {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(900, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(640, ac.currentTime + 0.07)
  gain.gain.setValueAtTime(0.28, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime)
  osc.stop(ac.currentTime + 0.11)
  playTone(1800, 'sine', 0.003, 0.05, 0.07)
}

/** mixed / general — two-tone ascending chime */
function playMixed() {
  playTone(659.25, 'sine', 0,    0.13, 0.25)
  playTone(880.00, 'sine', 0.11, 0.20, 0.25)
}

// ── Public API ───────────────────────────────────────────────────────────────

const MATERIAL_SOUNDS = {
  paper:   playPaper,
  plastic: playPlastic,
  metal:   playMetal,
  organic: playOrganic,
  ceramic: playCeramic,
  mixed:   playMixed,
}

/** Play the correct-drop sound matching the item's physical material. */
export function playMaterial(material) {
  const fn = MATERIAL_SOUNDS[material] ?? playMixed
  fn()
}

/** Descending sawtooth buzz — wrong drop. */
export function playWrong() {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(220, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.4)
  gain.gain.setValueAtTime(0.28, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.4)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(ac.currentTime)
  osc.stop(ac.currentTime + 0.45)
}

/** Short square blip — timer warning tick (≤10 s). */
export function playTick() {
  playTone(660, 'square', 0, 0.05, 0.12)
}

/** Bright sine tick — each countdown number (3, 2, 1). */
export function playCountdownTick() {
  playTone(880, 'sine', 0, 0.10, 0.22)
}

/** Rising three-note chime — GO! */
export function playCountdownGo() {
  playTone(659.25,  'sine', 0,    0.12, 0.28)
  playTone(880.00,  'sine', 0.10, 0.12, 0.28)
  playTone(1174.66, 'sine', 0.20, 0.22, 0.28)
}