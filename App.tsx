import React, { useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useScrollDirection } from './hooks/useScrollDirection';
import PokemonCard from './components/PokemonCard';
import AdBanner from './components/AdBanner';
import Button from './components/Button';
import Footer from './components/Footer';
import { GameState } from './types';
import { Play, Zap, Trophy, Frown, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const { 
    gameState, 
    playerCard, 
    computerCard, 
    score, 
    resultMessage, 
    winner, 
    startRound, 
    handleStatSelection,
    resetGame 
  } = useGameLogic();

  const [isAdExpanded, setIsAdExpanded] = useState(true);
  const scrollDirection = useScrollDirection();

  const headerClass = scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0';

  const PokeballIcon = () => (
    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 text-green-500 relative z-10 drop-shadow-[0_0_20px_rgba(34,197,94,0.6)]">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M 5,50 L 95,50" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="14" fill="currentColor" />
      <circle cx="50" cy="50" r="8" fill="#09090b" />
    </svg>
  );

  return (
    <div className="h-full w-full bg-zinc-950 flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-green-500/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Smart Header - Centered Scoreboard */}
      <header className={`h-14 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 absolute top-0 left-0 w-full z-40 flex justify-between items-center transition-transform duration-300 ${headerClass}`}>
        
        {/* Left: Reset Button */}
        <div className="z-20 relative">
          <button 
            onClick={resetGame} 
            className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-green-500 transition-colors uppercase tracking-wider bg-zinc-800/50 px-3 py-1.5 rounded-full hover:bg-zinc-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Center: Absolute Positioned Scoreboard */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold bg-zinc-800/80 px-4 py-1.5 rounded-full border border-zinc-700/50 shadow-sm backdrop-blur-sm whitespace-nowrap">
             <div className="flex items-center gap-1">
               <span className="text-green-500 text-sm md:text-base">{score.player}</span>
               <span className="text-zinc-500 text-[8px] uppercase tracking-wider">YOU</span>
             </div>
             <span className="text-zinc-600 font-light mx-1">vs</span>
             <div className="flex items-center gap-1">
               <span className="text-zinc-500 text-[8px] uppercase tracking-wider">CPU</span>
               <span className="text-red-500 text-sm md:text-base">{score.computer}</span>
             </div>
          </div>
        </div>

        {/* Right: Logo & Title */}
        <div className="flex items-center gap-2 z-20 relative">
          <h1 className="text-sm md:text-base font-black tracking-tighter text-white italic leading-none">POKE-TRUNFO</h1>
          <div className="bg-green-500 p-0.5 rounded">
             <Zap className="text-black w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 pt-14 pb-[30px]">
        
        {/* Intro Screen */}
        {gameState === GameState.START && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6 animate-fade-in">
            <div className="relative hover:scale-105 transition-transform duration-500 p-2">
              <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
              <PokeballIcon />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 italic tracking-tighter leading-none">
                POKE <br />
                <span className="bg-green-500 text-black px-2 transform -skew-x-6 inline-block shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  TRUNFO
                </span>
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm font-medium">
                Win the battle!
              </p>
            </div>
            <Button onClick={startRound} className="w-full max-w-[200px] shadow-green-900/50 py-3 text-sm">
              PLAY NOW
            </Button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === GameState.GAME_OVER && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6 animate-fade-in">
             <div className="relative p-4">
                <div className={`absolute inset-0 blur-3xl opacity-30 ${score.player > score.computer ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {score.player > score.computer ? (
                  <Trophy className="w-20 h-20 text-green-500 relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                ) : (
                  <Frown className="w-20 h-20 text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                )}
             </div>
             
             <div>
               <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-2">
                 {score.player > score.computer ? 'VICTORY!' : 'DEFEAT'}
               </h2>
               <p className="text-zinc-400 text-sm font-medium">
                 Final Score: <span className={score.player > score.computer ? 'text-green-500' : 'text-red-500'}>{score.player}</span> - {score.computer}
               </p>
             </div>

             <Button onClick={resetGame} className="w-full max-w-[200px] flex items-center justify-center gap-2">
               <RotateCcw className="w-4 h-4" />
               RESTART GAME
             </Button>
          </div>
        )}

        {/* Game Area - Shown during play */}
        {(gameState !== GameState.START && gameState !== GameState.GAME_OVER) && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-center w-full h-[75vh] max-w-6xl mx-auto relative px-4 md:px-0 md:gap-12">
            
            {/* OPPONENT CARD AREA */}
            <div className="order-1 md:order-2 w-full md:w-auto h-[35vh] md:h-auto flex flex-col justify-end md:justify-center items-center relative z-10 pb-4 md:pb-0">
               <div className="relative w-full flex justify-center items-end md:items-center h-full">
                 {computerCard ? (
                    <div className={`${isAdExpanded ? 'h-[70%]' : 'h-[90%]'} md:h-[340px] aspect-[2/3] md:w-[210px] transition-all duration-300`}>
                        <PokemonCard 
                          pokemon={computerCard} 
                          isHidden={gameState === GameState.PLAYER_TURN}
                          disabled={true}
                          isWinner={winner === 'computer'}
                          isLoser={winner === 'player'}
                        />
                    </div>
                  ) : (
                    <div className={`${isAdExpanded ? 'h-[70%]' : 'h-[90%]'} md:h-[340px] md:w-[210px] aspect-[2/3] bg-zinc-900/50 rounded-xl border-2 border-dashed border-zinc-800 animate-pulse mx-auto transition-all duration-300`} />
                  )}
              </div>
            </div>

            {/* PLAYER CARD AREA */}
            <div className={`order-2 md:order-1 w-full md:w-auto h-[40vh] md:h-auto flex items-start md:items-center justify-center z-20 transition-all duration-700 ease-in-out
              ${gameState === GameState.RESULT ? 'md:translate-y-0' : ''}
            `}>
              {playerCard ? (
                 <div className={`${isAdExpanded ? 'h-[75%]' : 'h-[90%]'} md:h-[400px] aspect-[2/3] md:w-[260px] flex justify-center transition-all duration-300`}>
                    <PokemonCard 
                      pokemon={playerCard} 
                      onStatSelect={handleStatSelection}
                      disabled={gameState !== GameState.PLAYER_TURN}
                      isWinner={winner === 'player'}
                      isLoser={winner === 'computer'}
                      isPlayer={true} 
                    />
                </div>
              ) : (
                 <div className="w-[80%] md:w-[260px] aspect-[2/3] bg-zinc-900/50 rounded-xl border-2 border-dashed border-zinc-800 animate-pulse" />
              )}
            </div>

          </div>
        )}
      </main>

      {/* Floating Action Button (Flip Animation) */}
      {(gameState !== GameState.START && gameState !== GameState.GAME_OVER) && (
        <div 
          className="fixed left-0 w-full flex justify-center items-center pointer-events-none z-50 transition-all duration-300"
          style={{ bottom: isAdExpanded ? '130px' : '80px' }}
        >
          <div className="pointer-events-auto perspective-1000">
            
            {/* 3D Flip Container */}
            <div className={`relative transition-transform duration-500 transform-style-3d ${gameState === GameState.RESULT ? 'rotate-x-180' : ''}`}>
              
              {/* Front Face: YOUR TURN (Indicator Only) */}
              <div className="backface-hidden">
                 <div className="px-5 py-2 bg-green-500 text-black font-black text-xs rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse flex items-center gap-2">
                    YOUR TURN
                  </div>
              </div>

              {/* Back Face: NEXT ROUND (Button) */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center backface-hidden rotate-x-180 -mt-6">
                  {/* Status Badge */}
                  <div className={`absolute -top-8 whitespace-nowrap px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xl backdrop-blur-md border ${winner === 'player' ? 'bg-green-500/90 text-black border-green-400' : winner === 'computer' ? 'bg-red-500/90 text-white border-red-400' : 'bg-zinc-700 text-white border-zinc-500'}`}>
                    {resultMessage}
                  </div>

                  <button 
                    onClick={startRound}
                    className="group relative px-8 py-3 bg-zinc-900 hover:bg-green-500 border border-green-500 text-green-500 hover:text-black rounded-full font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] active:scale-95 flex items-center gap-2 text-xs whitespace-nowrap"
                  >
                    <span>Next Round</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>
              </div>

            </div>
          </div>
        </div>
      )}
      <Footer/>
      <AdBanner isExpanded={isAdExpanded} onToggle={() => setIsAdExpanded(!isAdExpanded)} />
    </div>
  );
};

export default App;