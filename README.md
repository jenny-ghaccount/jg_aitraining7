# 🌍 Earth Month – Sustainability Challenge Tracker

A lightweight, static web application that helps individuals take meaningful action during **Earth Month (April)** through 30 daily eco-challenges, a carbon footprint estimator, and rotating sustainability tips.

## Features

| Feature | Description |
|---|---|
| **30-Day Eco-Challenges** | One action per day across five categories: Transport, Food, Energy, Waste, and Water. Click a card to mark it complete. |
| **Live Progress Summary** | Tracks completed challenges, eco-points earned, and estimated kg of CO₂ saved. State is persisted in `localStorage`. |
| **Category Filter** | Filter challenges by category to find actions relevant to your lifestyle. |
| **Carbon Footprint Estimator** | Answer 4 quick questions about transport, diet, and home energy to get a personalised monthly CO₂ estimate with a colour-coded gauge and a tailored tip. |
| **Sustainability Tips Carousel** | 10 rotating tips covering diet, transport, energy, water, shopping, and digital habits. Auto-advances every 8 seconds. |
| **Did You Know? Facts** | Six quick-read impact facts to motivate action. |

## Getting Started

No build step or dependencies required — it's pure HTML, CSS, and JavaScript.

```bash
# Clone the repository
git clone https://github.com/jenny-ghaccount/jg_aitraining7.git
cd jg_aitraining7

# Open in your browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Or simply drag `index.html` into any modern web browser.

## Project Structure

```
jg_aitraining7/
├── index.html   # Application markup
├── style.css    # Earth-themed styles (CSS variables, responsive grid)
└── app.js       # Data, state management, and UI logic
```

## Emission Factors

Carbon footprint estimates use the following approximate factors:

| Source | Factor |
|---|---|
| Petrol car | 0.192 kg CO₂ / km |
| Diesel car | 0.171 kg CO₂ / km |
| Electric car | 0.053 kg CO₂ / km |
| Public transit | 0.089 kg CO₂ / km |
| UK grid (home energy) | 0.233 kg CO₂ / kWh |

Dietary figures are monthly averages based on published lifecycle assessment data.
Estimates are approximations intended for educational purposes.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No polyfills or external libraries required.

## Licence

MIT