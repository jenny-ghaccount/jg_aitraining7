/**
 * sounds.js — Web Audio API sound effects for Recycle Rush.
 * All sounds are synthesized; no audio files are needed.
 *
 * Exports:
 *   playCorrect()  — two-note ascending chime (correct drop)
 *   playWrong()    — descending sawtooth buzz (wrong drop)
 *   playTick()     — short blip (timer warning tick, ≤10 s)
 */

let ctx = null

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if browser auto-suspended it
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  return ctx
}

/**
 * Play a single tone.
 * @param {number} freq       Frequency in Hz
 * @param {OscillatorType} type  Oscillator waveform
 * @param {number} startOffset  Seconds from now to start
 * @param {number} duration     Seconds the tone lasts
 * @param {number} gainVal      Peak gain (0–1)
 */
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

/** Two ascending sine tones: E5 → A5 */
export function playCorrect() {
  playTone(659.25, 'sine', 0,    0.13, 0.25)
  playTone(880.00, 'sine', 0.11, 0.20, 0.25)
}

/** Descending sawtooth buzz */
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

/** Short square blip for the timer warning tick */
export function playTick() {
  playTone(660, 'square', 0, 0.05, 0.12)
}
