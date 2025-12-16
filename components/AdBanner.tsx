import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdBannerProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({ isExpanded, onToggle }) => {
  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-[60] bg-zinc-950 border-t border-zinc-800 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isExpanded ? 'h-[90px]' : 'h-[30px]'}`}
    >
      <button 
        onClick={onToggle}
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-zinc-400 rounded-full p-1 border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors shadow-md z-50"
        aria-label={isExpanded ? "Minimize Ad" : "Maximize Ad"}
      >
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="flex flex-col items-center animate-fade-in w-full">
          <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1 font-bold">Advertisement</div>
          
          {/* 
            This is a placeholder for an actual Google AdSense unit or similar.
            In production, replace this div with the <ins> tag provided by the ad network.
          */}
          <div className="w-[728px] max-w-full h-[60px] bg-zinc-900 flex items-center justify-center rounded border border-dashed border-zinc-800 mx-4">
            <span className="text-zinc-700 text-sm font-medium">Anchor Ad Slot (Responsive)</span>
          </div>
        </div>
      )}
      
      {!isExpanded && (
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Ad Minimized</span>
      )}
    </div>
  );
};

export default AdBanner;