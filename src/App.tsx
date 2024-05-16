import { useState, useRef } from 'react'
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


const patterns = generatePatterns(["blue", "green", "purple"]);
//console.log(patterns)

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      
      <h1>Vite + React</h1>
      <CanvasRendering
        ref={canvasRef}
        width={25 * 10 * 4}
        height={25 * 10 * 4}
        cellSize={25}
        patterns={patterns}
      />
    </div>
  )
}

export default App
