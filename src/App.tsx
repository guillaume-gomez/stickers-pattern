import { useRef, useState } from 'react'
import './App.css'
import CanvasRendering from "./components/canvasRendering";
import usePattern, { Pattern } from "./usePattern";

const colors = ["blue", "red", "green", "purple"];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {generatePatterns } = usePattern();
  const [patterns, setPatterns] = useState<Pattern[]>(generatePatterns(colors));


  return (
    <div>
      
      <h1>Vite + React</h1>
      <button onClick={() => setPatterns(generatePatterns(colors)) }>
        generate
      </button>
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
