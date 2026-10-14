/**
 * Tutorial jogado na primeira partida: balão + mãozinha em cima do próprio
 * jogo, avançando só quando a pessoa faz a ação. O motor é o do portal
 * gamezzz (vendor/tutorial-jogo.js, gerado lá por esbuild).
 *
 * O tutorial vive fora do React (um só, mesmo com StrictMode montando duas
 * vezes); o componente só copia o estado do jogo para ele a cada render.
 */
import { useEffect } from 'react';
import '../vendor/tutorial-jogo.js';
import { GameState, Pokemon, StatType } from '../types';

interface Passo {
  id: string;
  texto: string;
  alvo?: () => Element | null;
  gesto?: 'toque' | 'nenhum';
  luz?: boolean;
  lugar?: 'auto' | 'topo' | 'base';
  ok?: () => boolean;
  quando?: () => boolean;
  segundos?: number;
}
declare global {
  interface Window {
    TutorialJogo?: { Tutorial: new (jogo: string, passos: Passo[]) => { iniciar(): void } };
  }
}

interface Estado { gameState: GameState; playerCard: Pokemon | null }
const estado: Estado = { gameState: GameState.START, playerCard: null };

/** Botão do atributo mais forte da sua carta: é o que a mão sugere. */
function melhorAtributo(): Element | null {
  const carta = estado.playerCard;
  if (!carta) return null;
  const melhor = (Object.keys(carta.stats) as StatType[]).sort((a, b) => carta.stats[b] - carta.stats[a])[0];
  return document.querySelector(`[data-stat="${melhor}"]`);
}

const T = window.TutorialJogo;
const tutorial = T
  ? new T.Tutorial('poke-trunfo', [
      { id: 'jogar', texto: 'Toque em PLAY NOW para receber sua primeira carta.', alvo: () => document.querySelector('[data-tut="jogar"]'),
        ok: () => estado.gameState !== GameState.START },
      { id: 'atributo', texto: 'Escolha um atributo da sua carta. Quem tiver o número maior nele ganha a rodada — vá no mais forte!',
        quando: () => estado.gameState === GameState.PLAYER_TURN, alvo: melhorAtributo, lugar: 'topo',
        ok: () => estado.gameState === GameState.RESULT },
      { id: 'cpu', texto: 'A carta da CPU vira e compara o mesmo atributo. Maior valor leva o ponto.', gesto: 'nenhum', lugar: 'topo',
        quando: () => estado.gameState === GameState.RESULT, segundos: 5 },
      { id: 'proxima', texto: 'Quem fizer 5 pontos primeiro vence. Próxima rodada!', quando: () => estado.gameState === GameState.RESULT,
        alvo: () => document.querySelector('[data-tut="proxima"]'), ok: () => estado.gameState !== GameState.RESULT },
    ])
  : null;

export default function TutorialJogado({ gameState, playerCard }: Estado) {
  estado.gameState = gameState;
  estado.playerCard = playerCard;
  useEffect(() => { tutorial?.iniciar(); }, []);
  return null;
}
