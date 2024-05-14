import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFullscreen } from "rooks";


interface CanvasRenderingProps {
  width: number;
  height: number;
  cellSize: number;
  patterns: number[];
}

export interface ExternalActionInterface {
  getImage: () => string |null ;
}

const CanvasRendering = forwardRef<ExternalActionInterface, CanvasRenderingProps>(({
  width,
  height,
  cellSize, 
  patterns
}, ref) => {
  const [displayPreview, setDisplayPreview] = useState<boolean>(true);
  const [hasBorder, setHasBorder] = useState<boolean>(true);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: refCanvas });

  useEffect(() => {
    if(refCanvas.current
        && refCanvas.current.width > 0
        && refCanvas.current.height > 0
      ) {
      const context = refCanvas.current.getContext("2d");
      if(!context) {
        return;
      }

      renderPatterns(context, patterns)
      if(hasBorder) {
        renderBorder(context, width, height);
      }
    }
  }, [refCanvas, patterns, hasBorder]);

  useImperativeHandle(ref, () => ({
    getImage() {
      if(refCanvas.current) {
        return refCanvas.current.toDataURL('image/png');
      }
      return null;
    }

  }));

  function renderBorder(context: CanvasRenderingContext2D, width: number, height: number) {
    context.fillStyle = "black";
    context.lineWidth = 2;
    for(let x=0; x < width; x += cellSize) {
      for(let y=0; y < height; y+= cellSize) {
        context.strokeRect(x, y, cellSize, cellSize);
      }
    }

    context.lineWidth = 4;
    for(let x=0; x < width; x += 10*cellSize) {
      for(let y=0; y < height; y+= 10*cellSize) {
        context.strokeRect(x, y, cellSize*10, cellSize*10);
      }
    }
  }

  function renderPatterns(context: CanvasRenderingContext2D, patterns: number[]) {
    patterns.forEach(pattern => renderPattern(context, pattern));
  }

  function renderPattern(context: CanvasRenderingContext2D, pattern: number) {
    const patternPosition = pattern.position;
    pattern.stickers.forEach(({x, y, color}) => {
      const worldX = x * cellSize + patternPosition.x * 10 * cellSize;
      const worldY = y * cellSize + patternPosition.y * 10 * cellSize;
      return renderCircle(context, color, worldX, worldY);
    });
  }

  function renderSquare(context : CanvasRenderingContext2D, color: string, x: number, y: number) {
    context.fillStyle = color;
    context.fillRect(x,y, cellSize, cellSize);
  }

  function renderCircle(context: CanvasRenderingContext2D, color: string, x: number, y: number) {
    context.beginPath();
    context.arc(x + cellSize/2, y + cellSize/2, cellSize/2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }

  return (
    <canvas
      className={ displayPreview ? "absolute hidden" : "absolute"}
      ref={refCanvas}
      width={width}
      height={height}
      style={{background:"#797979", overflow: 'scroll'}}
      onDoubleClick={toggleFullscreen}
    />
  );
});

export default CanvasRendering;
