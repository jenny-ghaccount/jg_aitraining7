import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import WASTE_ITEMS from './wasteItems'

const ROUND_SECONDS = 60
const SPAWN_INTERVAL = 2000
const MAX_ACTIVE = 5

// Items that appear more frequently (recognisable household examples)
const COMMON_ITEM_IDS = new Set([
  'water-bottle', 'banana-peel', 'newspaper', 'greasy-pizza-box',
  'shampoo-bottle', 'apple-core', 'cardboard-box', 'used-tissue',
])

// Pick the next item to spawn with variety safeguards:
//  1. Never repeat the exact last spawned item ID
//  2. Halve weight for items whose bin is currently the most crowded on screen
//  3. Double weight for recognisable common items
function pickNextItem(activeItems, lastSpawnedId) {
  const binCount = { general: 0, paper: 0, plastic: 0, organic: 0 }
  for (const item of activeItems) binCount[item.bin]++
  const maxOnScreen = Math.max(...Object.values(binCount))

  const pool = []
  for (const item of WASTE_ITEMS) {
    if (item.id === lastSpawnedId) continue // hard block on immediate repeat
    let weight = COMMON_ITEM_IDS.has(item.id) ? 2 : 1
    // Reduce weight when this bin already dominates the screen
    if (maxOnScreen > 0 && binCount[item.bin] === maxOnScreen) {
      weight = Math.ceil(weight / 2)
    }
    for (let i = 0; i < weight; i++) pool.push(item)
  }

  // Fallback: if every item was the last spawned (only 1 item in pool somehow)
  if (pool.length === 0) {
    const fallback = WASTE_ITEMS.filter((i) => i.id !== lastSpawnedId)
    return fallback[Math.floor(Math.random() * fallback.length)]
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

function randomPosition() {
  return {
    left: 10 + Math.random() * 70,   // 10-80% from left
    top: 10 + Math.random() * 55,    // 10-65% from top
  }
}

let nextSpawnId = 0

function App() {
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [activeItems, setActiveItems] = useState([])
  const [poppingItems, setPoppingItems] = useState(new Set())
  const [draggedItem, setDraggedItem] = useState(null)
  const [highlightedBin, setHighlightedBin] = useState(null)
  const [showFlash, setShowFlash] = useState(false)
  const [teachingMsg, setTeachingMsg] = useState(null)
  const [lang, setLang] = useState('en')
  const [showHint, setShowHint] = useState(true)
  const flashTimer = useRef(null)
  const teachingTimer = useRef(null)
  const hintTimer = useRef(null)
  const lastSpawnedIdRef = useRef(null)
  const seenItemIdsRef = useRef(new Set())

  // Countdown timer
  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      setRunning(false)
      return
    }
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          setRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, timeLeft <= 0])

  // Spawn items periodically
  useEffect(() => {
    if (!running) return
    // Auto-dismiss hint after 2.5 s
    if (hintTimer.current) clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => setShowHint(false), 2500)
    const spawn = () => {
      setActiveItems((prev) => {
        if (prev.length >= MAX_ACTIVE) return prev
        const item = pickNextItem(prev, lastSpawnedIdRef.current)
        lastSpawnedIdRef.current = item.id
        const pos = randomPosition()
        return [...prev, { ...item, spawnId: nextSpawnId++, pos }]
      })
    }
    spawn() // spawn one immediately
    const id = setInterval(spawn, SPAWN_INTERVAL)
    return () => clearInterval(id)
  }, [running])

  const timerPercent = (timeLeft / ROUND_SECONDS) * 100
  const timerWarn = timeLeft <= 10

  const removeItem = useCallback((spawnId) => {
    setActiveItems((prev) => prev.filter((i) => i.spawnId !== spawnId))
    setPoppingItems((prev) => { const n = new Set(prev); n.delete(spawnId); return n })
  }, [])

  const popThenRemove = useCallback((spawnId) => {
    setPoppingItems((prev) => new Set(prev).add(spawnId))
    setTimeout(() => removeItem(spawnId), 350)
  }, [removeItem])

  const incrementScore = useCallback(() => {
    setScore((s) => s + 1)
  }, [])

  const resetScore = useCallback(() => {
    setScore(0)
  }, [])

  const triggerFlash = useCallback(() => {
    if (flashTimer.current) clearTimeout(flashTimer.current)
    setShowFlash(true)
    flashTimer.current = setTimeout(() => setShowFlash(false), 1200)
  }, [])

  const triggerTeaching = useCallback((item) => {
    if (!item.teachingMessage) return
    if (seenItemIdsRef.current.has(item.id)) return
    seenItemIdsRef.current.add(item.id)
    if (teachingTimer.current) clearTimeout(teachingTimer.current)
    setTeachingMsg({ en: item.teachingMessage, de: item.teachingMessageDe || item.teachingMessage })
    teachingTimer.current = setTimeout(() => setTeachingMsg(null), 2800)
  }, [])

  const handleRestart = useCallback(() => {
    setTimeLeft(ROUND_SECONDS)
    setScore(0)
    setActiveItems([])
    setPoppingItems(new Set())
    setShowFlash(false)
    if (flashTimer.current) clearTimeout(flashTimer.current)
    if (teachingTimer.current) clearTimeout(teachingTimer.current)
    if (hintTimer.current) clearTimeout(hintTimer.current)
    setTeachingMsg(null)
    setShowHint(true)
    seenItemIdsRef.current = new Set()
    lastSpawnedIdRef.current = null
    setRunning(true)
    nextSpawnId = 0
  }, [])

  // Drag handlers
  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', item.spawnId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null)
    setHighlightedBin(null)
  }, [])

  const handleBinDragOver = useCallback((e, binType) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setHighlightedBin(binType)
  }, [])

  const handleBinDragLeave = useCallback(() => {
    setHighlightedBin(null)
  }, [])

  const handleBinDrop = useCallback((e, binType) => {
    e.preventDefault()
    setHighlightedBin(null)
    if (!draggedItem) return

    const isCorrect = draggedItem.bin === binType
    if (isCorrect) {
      popThenRemove(draggedItem.spawnId)
      incrementScore()
      triggerTeaching(draggedItem)
    } else {
      removeItem(draggedItem.spawnId)
      resetScore()
      triggerFlash()
    }

    setDraggedItem(null)
  }, [draggedItem, removeItem, popThenRemove, incrementScore, resetScore, triggerFlash, triggerTeaching])

  return (
    <div className="game-screen">
      {/* First-time teaching message toast */}
      {teachingMsg && (
        <div className="teaching-toast" key={teachingMsg.en}>
          <span className="teaching-toast__icon">💡</span>
          <span className="teaching-toast__text">{lang === 'en' ? teachingMsg.en : teachingMsg.de}</span>
        </div>
      )}

      {/* Wrong-drop flash overlay */}
      {showFlash && (
        <div className="flash-overlay">
          <div className="flash-overlay__content">
            <span className="flash-overlay__smiley">😢</span>
            <span className="flash-overlay__text">That was wrong!</span>
          </div>
        </div>
      )}

      {/* HUD */}
      <header className="hud">
        <h1 className="hud__title">♻️ Recycle Rush</h1>
        <div className="hud__stats">
          <div className="hud__score">
            {lang === 'en' ? 'Score' : 'Punkte'}: <span className="hud__score-value">{score}</span>
          </div>
          <div className="hud__timer">
            <span className={`hud__timer-value${timerWarn ? ' hud__timer-value--warn' : ''}`}>
              {timeLeft}
            </span>s
            <div className="hud__timer-bar">
              <div
                className={`hud__timer-fill${timerWarn ? ' hud__timer-fill--warn' : ''}`}
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>
          <div className="hud__lang">
            <button
              className={`lang-btn${lang === 'en' ? ' lang-btn--active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
            <button
              className={`lang-btn${lang === 'de' ? ' lang-btn--active' : ''}`}
              onClick={() => setLang('de')}
            >DE</button>
          </div>
        </div>
      </header>

      {/* Playfield */}
      <main className="playfield">
        {running ? (
          <>
            {showHint && (
              <p
                className="playfield__hint"
                onAnimationEnd={() => setShowHint(false)}
              >
                {lang === 'en'
                  ? 'Drag each item into the right bin before time runs out!'
                  : 'Ziehe jeden Gegenstand in den richtigen Behälter, bevor die Zeit abläuft!'}
              </p>
            )}
            {activeItems.map((item) => (
              <div
                key={item.spawnId}
                className={`waste-item${poppingItems.has(item.spawnId) ? ' waste-item--pop' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                style={{
                  left: `${item.pos.left}%`,
                  top: `${item.pos.top}%`,
                }}
              >
                <span className="waste-item__emoji">{item.emoji}</span>
                <span className="waste-item__label">{lang === 'en' ? item.label : item.labelDe}</span>
              </div>
            ))}
          </>
        ) : (
          <div className="round-over">
            <h2 className="round-over__title">{lang === 'en' ? "⏰ Time's up!" : '⏰ Zeit abgelaufen!'}</h2>
            <p className="round-over__score">{lang === 'en' ? 'Final score' : 'Endpunktzahl'}: {score}</p>
            <button className="round-over__btn" onClick={handleRestart}>
              {lang === 'en' ? 'Play again' : 'Nochmal spielen'}
            </button>
          </div>
        )}
      </main>

      {/* Bins */}
      <footer className="bins">
        <div
          className={`bin bin--general${highlightedBin === 'general' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'general')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'general')}
        >
          <span className="bin__icon">🗑️</span>
          <span className="bin__label">{lang === 'en' ? 'General' : 'Restmüll'}</span>
        </div>
        <div
          className={`bin bin--paper${highlightedBin === 'paper' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'paper')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'paper')}
        >
          <span className="bin__icon">📄</span>
          <span className="bin__label">{lang === 'en' ? 'Paper' : 'Papier'}</span>
        </div>
        <div
          className={`bin bin--plastic${highlightedBin === 'plastic' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'plastic')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'plastic')}
        >
          <span className="bin__icon">🧴</span>
          <span className="bin__label">{lang === 'en' ? 'Plastic' : 'Kunststoff'}</span>
        </div>
        <div
          className={`bin bin--organic${highlightedBin === 'organic' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'organic')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'organic')}
        >
          <span className="bin__icon">🌿</span>
          <span className="bin__label">{lang === 'en' ? 'Organic' : 'Biomüll'}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
