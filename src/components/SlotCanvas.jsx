import React from 'react';
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as PIXI from 'pixi.js';

/**
 * PixiCanvas renders the slot grid and exposes a spin() function
 * @param {object} props
 * @param {number} props.rows - Number of rows
 * @param {number} props.cols - Number of columns
 * @param {number} props.cellSize - Size of each slot cell
 */

const PixiCanvas = forwardRef(({ rows = 4, cols = 5, cellSize = 100 }, ref) => {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const symbolsRef = useRef([]);
  const texturesRef = useRef([]);

  useEffect(() => {
    const app = new PIXI.Application({
      width: cols * cellSize,
      height: rows * cellSize,
      backgroundColor: 0x222222,
      antialias: true,
    });

    appRef.current = app;
    containerRef.current.appendChild(app.view);

    const textures = [
      PIXI.Texture.from('/assets/cherry.png'),
      PIXI.Texture.from('/assets/lemon.png'),
      PIXI.Texture.from('/assets/bar.png'),
      PIXI.Texture.from('/assets/seven.png'),
      PIXI.Texture.from('/assets/diamond.png'),
      PIXI.Texture.from('/assets/horseshoe.png'),
      PIXI.Texture.from('/assets/heart.png'),
      PIXI.Texture.from('/assets/bell.png'),
      PIXI.Texture.from('/assets/watermelon.png'),
    ];
    texturesRef.current = textures;

    const symbols = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const texture = textures[Math.floor(Math.random() * textures.length)];
        const sprite = new PIXI.Sprite(texture);

        sprite.width = cellSize - 8;
        sprite.height = cellSize - 8;
        sprite.x = c * cellSize + 4;
        sprite.y = r * cellSize + 4;

        app.stage.addChild(sprite);
        symbols.push({ sprite, row: r, col: c });
      }
    }
    symbolsRef.current = symbols;

    return () => {
      app.destroy(true, { children: true });
    };
  }, [rows, cols, cellSize]);

  // Spin logic with vertical scroll
  useImperativeHandle(ref, () => ({
    spin: () => {
      const start = performance.now();

      const tickerFn = () => {
        const elapsed = performance.now() - start;

        symbolsRef.current.forEach(({ sprite, col }) => {
          // Scroll down
          sprite.y += 25;

          // If symbol moves out view, reset to top with new random texture
          if (sprite.y >= rows * cellSize) {
            sprite.y = -cellSize + 4;
            sprite.texture =
              texturesRef.current[
                Math.floor(Math.random() * texturesRef.current.length)
              ];
          }

          // Column duration (staggered stops)
          const colDuration = 1000 + col * 200;
          if (elapsed > colDuration) {
            // Snap sprite to nearest row
            const rowIndex = Math.round(sprite.y / cellSize);
            sprite.y = rowIndex * cellSize + 4;
          }
        });

        // Stop ticker once all columns finished
        const maxDuration = 1000 + (cols - 1) * 200;
        if (elapsed > maxDuration) {
          appRef.current.ticker.remove(tickerFn);
        }
      };

      appRef.current.ticker.add(tickerFn);
    },
  }));

  return <div ref={containerRef} />;
});

export default PixiCanvas;
