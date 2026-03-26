import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import WASTE_ITEMS from './wasteItems'

const ROUND_SECONDS = 60
const SPAWN_INTERVAL = 2000
const MAX_ACTIVE = 5

function pickRandom() {
  return WASTE_ITEMS[Math.floor(Math.random() * WASTE_ITEMS.length)]
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
  const [draggedItem, setDraggedItem] = useState(null)
  const [highlightedBin, setHighlightedBin] = useState(null)
  const [showFlash, setShowFlash] = useState(false)
  const flashTimer = useRef(null)

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
    const spawn = () => {
      setActiveItems((prev) => {
        if (prev.length >= MAX_ACTIVE) return prev
        const item = pickRandom()
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
  }, [])

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

  const handleRestart = useCallback(() => {
    setTimeLeft(ROUND_SECONDS)
    setScore(0)
    setActiveItems([])
    setShowFlash(false)
    if (flashTimer.current) clearTimeout(flashTimer.current)
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
    removeItem(draggedItem.spawnId)

    if (isCorrect) {
      incrementScore()
    } else {
      resetScore()
      triggerFlash()
    }

    setDraggedItem(null)
  }, [draggedItem, removeItem, incrementScore, resetScore, triggerFlash])

  return (
    <div className="game-screen">
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
            Score: <span className="hud__score-value">{score}</span>
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
        </div>
      </header>

      {/* Playfield */}
      <main className="playfield">
        {running ? (
          <>
            {activeItems.length === 0 && (
              <p className="playfield__hint">
                Drag each item into the right bin before time runs out!
              </p>
            )}
            {activeItems.map((item) => (
              <div
                key={item.spawnId}
                className="waste-item"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                style={{
                  left: `${item.pos.left}%`,
                  top: `${item.pos.top}%`,
                }}
              >
                <span className="waste-item__emoji">{item.emoji}</span>
                <span className="waste-item__label">{item.label}</span>
              </div>
            ))}
          </>
        ) : (
          <div className="round-over">
            <h2 className="round-over__title">⏰ Time's up!</h2>
            <p className="round-over__score">Final score: {score}</p>
            <button className="round-over__btn" onClick={handleRestart}>
              Play again
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
          <span className="bin__label">General</span>
        </div>
        <div
          className={`bin bin--paper${highlightedBin === 'paper' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'paper')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'paper')}
        >
          <span className="bin__icon">📄</span>
          <span className="bin__label">Paper</span>
        </div>
        <div
          className={`bin bin--plastic${highlightedBin === 'plastic' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'plastic')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'plastic')}
        >
          <span className="bin__icon">🧴</span>
          <span className="bin__label">Plastic</span>
        </div>
        <div
          className={`bin bin--organic${highlightedBin === 'organic' ? ' bin--highlight' : ''}`}
          onDragOver={(e) => handleBinDragOver(e, 'organic')}
          onDragLeave={handleBinDragLeave}
          onDrop={(e) => handleBinDrop(e, 'organic')}
        >
          <span className="bin__icon">🌿</span>
          <span className="bin__label">Organic</span>
        </div>
      </footer>
    </div>
  )
}

export default App
