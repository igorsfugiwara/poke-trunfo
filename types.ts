// Enum for Game States
export enum GameState {
  START = 'START',
  LOADING = 'LOADING',
  PLAYER_TURN = 'PLAYER_TURN',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER'
}

// Enum for Pokemon Stats
export enum StatType {
  HP = 'hp',
  ATTACK = 'attack',
  DEFENSE = 'defense',
  SPEED = 'speed'
}

// Interface for a Pokemon Stat object from API
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Interface for the Pokemon Model
export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: {
    [key in StatType]: number;
  };
}

// Interface for the Game Score
export interface Score {
  player: number;
  computer: number;
}
