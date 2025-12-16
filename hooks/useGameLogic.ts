import { useState, useCallback, useEffect } from 'react';
import { Pokemon, GameState, Score, StatType } from '../types';
import { fetchRandomPokemon } from '../services/pokeService';

export const useGameLogic = () => {
  // State definitions
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [playerCard, setPlayerCard] = useState<Pokemon | null>(null);
  const [computerCard, setComputerCard] = useState<Pokemon | null>(null);
  const [score, setScore] = useState<Score>({ player: 0, computer: 0 });
  const [resultMessage, setResultMessage] = useState<string>('');
  const [winner, setWinner] = useState<'player' | 'computer' | 'draw' | null>(null);

  const WIN_CONDITION = 5;

  /**
   * Initializes a new round by fetching two random cards.
   * Checks if win condition (5 points) is met first.
   */
  const startRound = useCallback(async () => {
    // Check for Game Over condition
    if (score.player >= WIN_CONDITION || score.computer >= WIN_CONDITION) {
      setGameState(GameState.GAME_OVER);
      return;
    }

    setGameState(GameState.LOADING);
    setWinner(null);
    setResultMessage('');
    
    // Fetch data in parallel for efficiency
    const [pCard, cCard] = await Promise.all([
      fetchRandomPokemon(),
      fetchRandomPokemon()
    ]);

    setPlayerCard(pCard);
    setComputerCard(cCard);
    setGameState(GameState.PLAYER_TURN);
  }, [score]);

  /**
   * Handles the player's selection of a stat.
   * Compares the stats and determines the winner of the round.
   * @param stat The stat selected by the user
   */
  const handleStatSelection = (stat: StatType) => {
    if (!playerCard || !computerCard) return;

    const playerValue = playerCard.stats[stat];
    const computerValue = computerCard.stats[stat];

    let currentWinner: 'player' | 'computer' | 'draw' = 'draw';
    let message = '';

    if (playerValue > computerValue) {
      currentWinner = 'player';
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      message = 'You Won!';
    } else if (computerValue > playerValue) {
      currentWinner = 'computer';
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      message = 'Computer Won!';
    } else {
      message = "It's a Draw!";
    }

    setWinner(currentWinner);
    setResultMessage(message);
    setGameState(GameState.RESULT);
  };

  /**
   * Resets the entire game.
   */
  const resetGame = () => {
    setScore({ player: 0, computer: 0 });
    setGameState(GameState.START);
    setPlayerCard(null);
    setComputerCard(null);
  };

  return {
    gameState,
    playerCard,
    computerCard,
    score,
    resultMessage,
    winner,
    startRound,
    handleStatSelection,
    resetGame
  };
};