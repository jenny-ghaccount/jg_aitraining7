import './App.css'

function App() {
  return (
    <div className="game-screen">
      {/* HUD */}
      <header className="hud">
        <h1 className="hud__title">♻️ Recycle Rush</h1>
        <div className="hud__stats">
          <div className="hud__score">
            Score: <span className="hud__score-value">0</span>
          </div>
          <div className="hud__timer">
            <span className="hud__timer-value">60</span>s
            <div className="hud__timer-bar">
              <div className="hud__timer-fill" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Playfield */}
      <main className="playfield">
        <p className="playfield__hint">
          Drag each item into the right bin before time runs out!
        </p>
      </main>

      {/* Bins */}
      <footer className="bins">
        <div className="bin bin--general">
          <span className="bin__icon">🗑️</span>
          <span className="bin__label">General</span>
        </div>
        <div className="bin bin--paper">
          <span className="bin__icon">📄</span>
          <span className="bin__label">Paper</span>
        </div>
        <div className="bin bin--plastic">
          <span className="bin__icon">🧴</span>
          <span className="bin__label">Plastic</span>
        </div>
        <div className="bin bin--organic">
          <span className="bin__icon">🌿</span>
          <span className="bin__label">Organic</span>
        </div>
      </footer>
    </div>
  )
}

export default App
