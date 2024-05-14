import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CanvasRendering from "./components/canvasRendering";
import sample from "lodash/sample";

interface Position  {
  x: number;
  y: number;
}

interface Sticker extends Position {
  color: string;
}

interface Pattern {
  position: Position;
  stickers: Sticker[];
}

function generatePattern(x: number, y: number, possibleStickersColors: string[], percentage: number) {
  let stickers = [];
  for(let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if(Math.random() > percentage) {
        stickers.push({ x:i, y:j, color: sample(possibleStickersColors)})
      }
    }
  }
  return {
    position: {x, y},
    stickers
  };
}

function generatePatterns(possibleStickersColors: string[]) {
  let patterns = [];
  for(let x = 0; x < 4; x++) {
    for(let y = 0; y < 4; y++) {
      patterns.push(generatePattern(x, y, possibleStickersColors, 0.5));
    }
  }
  return patterns;
}

/*const patterns : Pattern[] = [
  {
    position: {x:0, y: 0},
    stickers: [
      { x: 0, y: 0, color: "red" },
      { x: 3, y: 0, color: "blue" },
      { x: 0, y: 3, color: "purple" },
      { x: 4, y: 3, color: "green" }
    ]
  },
  {
    position: {x:1, y: 0},
    stickers: [
      { x: 0, y: 0, color: "brown" },
      { x: 3, y: 0, color: "orange" },
      { x: 0, y: 3, color: "purple" },
      { x: 4, y: 3, color: "green" }
    ]
  }
];*/

const patterns = generatePatterns(["blue", "green", "purple"]);
//console.log(patterns)

function App() {
  const [count, setCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CanvasRendering
        ref={canvasRef}
        width={25 * 10 * 4}
        height={25 * 10 * 4}
        cellSize={25}
        patterns={patterns}
      />
    </>
  )
}

export default App
