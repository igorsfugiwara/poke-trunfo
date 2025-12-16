import React from 'react';
import { Pokemon, StatType } from '../types';
import { Shield, Zap, Heart, Wind } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  isHidden?: boolean; 
  onStatSelect?: (stat: StatType) => void;
  disabled?: boolean;
  isWinner?: boolean;
  isLoser?: boolean;
  isPlayer?: boolean; 
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  isHidden = false, 
  onStatSelect, 
  disabled = false,
  isWinner = false,
  isLoser = false,
  isPlayer = false
}) => {
  
  const getTypeColor = (type: string) => {
    const colors: {[key: string]: string} = {
      normal: 'bg-zinc-400', fire: 'bg-orange-500', water: 'bg-blue-500',
      electric: 'bg-yellow-400', grass: 'bg-green-500', ice: 'bg-cyan-300',
      fighting: 'bg-red-700', poison: 'bg-purple-500', ground: 'bg-amber-600',
      flying: 'bg-indigo-400', psychic: 'bg-pink-500', bug: 'bg-lime-500',
      rock: 'bg-stone-500', ghost: 'bg-violet-600', dragon: 'bg-indigo-600',
      steel: 'bg-slate-400', fairy: 'bg-rose-400'
    };
    return colors[type.toLowerCase()] || 'bg-zinc-500';
  };

  const mainType = pokemon.types[0];
  const cardColor = getTypeColor(mainType);

  const getIcon = (stat: StatType) => {
    switch (stat) {
      case StatType.HP: return <Heart className="w-2.5 h-2.5 text-white/90" />;
      case StatType.ATTACK: return <Zap className="w-2.5 h-2.5 text-white/90" />;
      case StatType.DEFENSE: return <Shield className="w-2.5 h-2.5 text-white/90" />;
      case StatType.SPEED: return <Wind className="w-2.5 h-2.5 text-white/90" />;
    }
  };

  let borderClass = "border-zinc-800";
  if (isWinner) borderClass = "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
  if (isLoser) borderClass = "border-red-500 opacity-80 grayscale-[0.3]";

  // --- Front Content ---
  const FrontContent = () => (
    <div className={`w-full h-full ${cardColor} rounded-xl p-1.5 flex flex-col shadow-xl border-[3px] ${borderClass} transition-all duration-300 overflow-hidden`}>
      
      {/* Header - Compact */}
      <div className="bg-black/20 rounded-md py-0.5 px-1.5 text-center mb-0.5 shrink-0">
        <h3 className="text-[10px] md:text-xs font-black uppercase text-white truncate leading-tight">{pokemon.name}</h3>
        <div className="flex justify-center gap-1 mt-0.5">
          {pokemon.types.map(t => (
            <span key={t} className="px-1.5 py-[1px] text-[7px] md:text-[8px] font-bold bg-white/20 text-white rounded-full uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Image - Flexible with min-height constraint */}
      <div className={`relative bg-white/10 rounded-md flex items-center justify-center mb-0.5 overflow-hidden shrink-1 min-h-[40px]
        ${isPlayer ? 'flex-1' : 'flex-1'}`}>
         {/* Watermark */}
        <div className="absolute opacity-10 rotate-12 right-0 bottom-0">
             <svg width="50" height="50" viewBox="0 0 100 100" fill="white"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8"/></svg>
        </div>
        <img 
          src={pokemon.sprite} 
          alt={pokemon.name} 
          className="w-full h-full object-contain drop-shadow-md z-10 p-1" 
        />
      </div>

      {/* Stats - Compact List */}
      <div className="space-y-[2px] bg-black/20 rounded-md p-1 shrink-0">
        {(Object.keys(pokemon.stats) as StatType[]).map((stat) => (
          <button
            key={stat}
            onClick={() => onStatSelect && !disabled && onStatSelect(stat)}
            disabled={disabled}
            className={`w-full flex items-center justify-between py-[1px] px-1.5 rounded transition-all h-[18px] md:h-[22px]
              ${!disabled && onStatSelect 
                ? 'hover:bg-white/20 cursor-pointer active:scale-95 bg-black/10' 
                : 'cursor-default'
              }
              ${disabled && !onStatSelect ? 'opacity-90' : ''}
            `}
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <div className="p-0.5 rounded bg-white/10 shrink-0">{getIcon(stat)}</div>
              <span className="text-[8px] font-bold uppercase text-white/90 tracking-wider truncate leading-none pt-[1px]">{stat}</span>
            </div>
            <span className="text-[10px] md:text-xs font-black text-white leading-none">{pokemon.stats[stat]}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const BackContent = () => (
    <div className="w-full h-full bg-zinc-900 rounded-xl border-[3px] border-zinc-700 flex flex-col items-center justify-center p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '8px 8px'}}></div>
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] border-zinc-700 flex items-center justify-center mb-1 bg-zinc-800">
            <span className="text-green-500 font-bold text-lg md:text-xl">?</span>
        </div>
        <div className="text-zinc-600 font-bold uppercase tracking-widest text-[7px] md:text-[9px]">Opponent</div>
    </div>
  );

  return (
    <div className={`w-full h-full`}>
       {/* Card Wrapper with 3D context */}
      {isPlayer ? (
         <div className="relative w-full h-full">
            {isWinner && <div className="absolute -top-2 -right-2 z-20 bg-green-500 text-black font-bold px-1.5 py-0.5 rounded text-[9px] shadow-lg animate-bounce">WIN</div>}
            {isLoser && <div className="absolute -top-2 -right-2 z-20 bg-red-500 text-white font-bold px-1.5 py-0.5 rounded text-[9px] shadow-lg">LOST</div>}
            <FrontContent />
         </div>
      ) : (
        <div className="perspective-1000 w-full h-full">
          <div className={`relative w-full h-full transition-transform duration-[400ms] transform-style-3d ${isHidden ? 'rotate-y-180' : ''}`}>
            <div className="absolute inset-0 backface-hidden">
               <div className="relative w-full h-full">
                 {isWinner && <div className="absolute -top-2 -right-2 z-20 bg-green-500 text-black font-bold px-1.5 py-0.5 rounded text-[9px] shadow-lg animate-bounce">WIN</div>}
                 {isLoser && <div className="absolute -top-2 -right-2 z-20 bg-red-500 text-white font-bold px-1.5 py-0.5 rounded text-[9px] shadow-lg">LOST</div>}
                 <FrontContent />
               </div>
            </div>
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <BackContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;