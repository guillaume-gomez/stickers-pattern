import { useRef, useState, useEffect } from 'react'
import './App.css'
import CanvasRendering from "./components/canvasRendering";
import ColorInput from "./components/colorInput";
import usePattern, { Pattern } from "./usePattern";
import { createHueShiftPalette, hslToRgb } from "./colors-generation.ts";

const COLORS = ["#0000FF", "#FF0000", "#00FF00", "#235F78"];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {generatePatterns } = usePattern();
  const [colors, setColors] = useState<string[]>(COLORS);
  const [patterns, setPatterns] = useState<Pattern[]>(generatePatterns(colors));

  useEffect(() => {
    setPatterns(generatePatterns(colors));
  }, [colors])

  function updateColor(position: number, newColor: string) {
    const newColors = colors.map((color, index) => {
        if(position === index) {
          return newColor;
        }
        return color
    });
    setColors(newColors);
  }

  function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
  }

  function random() {
    const hslColors = createHueShiftPalette(
      {
        base: {
          l: Math.random() * 100,
          c: Math.random() * 150,
          h: Math.random() * 360,
        },
        minLightness: 10,
        maxLightness: 90,
        hueStep: 12,
        numberOfColor: 4,
      }
    );
    console.log(hslColors)

    setColors(hslColors);
  }

  return (
    <div>
      
      <h1>Vite + React</h1>
      <button onClick={() => setPatterns(generatePatterns(colors)) }>
        generate
      </button>
       <button onClick={() => random() }>
          Random
      </button>
      {
        colors.map((color, index) => {
          return (
            <ColorInput
              label={`Color ${index + 1}`}
              value={color}
              onChange={(newColor) => updateColor(index, newColor)}
            />);
        })
      }
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
