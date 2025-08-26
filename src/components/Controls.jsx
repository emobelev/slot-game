import React from 'react';
import { useRef, useState } from 'react';
import PixiCanvas from './slotCanvas';

function Controls() {
  const pixiRef = useRef(null);
  const [balance, setBalance] = useState(1000);

  const handleStart = () => {
    if (pixiRef.current) {
      pixiRef.current.spin();
    }
    setBalance((b) => b - 10);
  };

  return (
    <div className="app">
      <h1>🎰 Slot Game</h1>
      <PixiCanvas ref={pixiRef} rows={4} cols={5} cellSize={100} />
      <div className="balance-start-section">
        <p className="balance">
          Balance: <span>{balance}</span>
        </p>
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Controls;
