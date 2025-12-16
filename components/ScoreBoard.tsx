import React from 'react';
import { Score } from '../types';

interface ScoreBoardProps {
  score: Score;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    // Moved up to top-[50px] (just below 48px header) and scaled down on mobile (scale-75)
    <div className="fixed top-[50px] md:top-24 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none origin-top scale-75 md:scale-100">
      <div className="flex items-center gap-3 px-5 py-1.5 bg-zinc-900/90 backdrop-blur-md rounded-full border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="text-green-500 font-black text-xl">{score.player}</span>
          <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">YOU</span>
        </div>
        
        <div className="text-[10px] font-bold text-zinc-700">VS</div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">CPU</span>
          <span className="text-red-500 font-black text-xl">{score.computer}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;