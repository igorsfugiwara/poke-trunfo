import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md py-3 px-4 z-30 absolute bottom-[30px]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">

                <p className="text-zinc-600 text-[10px] font-medium">
                    © 2026 <span className="text-zinc-400">Poke-Trunfo</span> · Desenvolvido por{' '}
                    <a
                        href="https://github.com/igorsfugiwara"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-400 transition-colors"
                    >
                        Igor Fugiwara
                    </a>
                </p>

                <div className="flex items-center gap-4">
                    <a
                        href="/privacidade.html"
                        className="text-[10px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider"
                    >
                        Política de Privacidade
                    </a>
                    <a
                        href="https://github.com/igorsfugiwara/poke-trunfo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-medium text-zinc-500 hover:text-white transition-colors group uppercase tracking-wider"
                    >
                        <Github className="w-3 h-3" />
                        Repositório
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;