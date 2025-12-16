import { Pokemon, StatType, PokemonStat } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';
const MAX_POKEMON_ID = 151; // Limiting to Gen 1 for nostalgia and simplicity

/**
 * Fetches a random Pokemon from the PokeAPI.
 * @returns Promise<Pokemon>
 */
export const fetchRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
  
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${randomId}`);
    if (!response.ok) {
      throw new Error(`Error fetching Pokemon with ID ${randomId}`);
    }
    
    const data = await response.json();
    
    // Map API response to our Model
    const statsMap: { [key in StatType]: number } = {
      [StatType.HP]: 0,
      [StatType.ATTACK]: 0,
      [StatType.DEFENSE]: 0,
      [StatType.SPEED]: 0,
    };

    data.stats.forEach((s: PokemonStat) => {
      if (s.stat.name === 'hp') statsMap[StatType.HP] = s.base_stat;
      if (s.stat.name === 'attack') statsMap[StatType.ATTACK] = s.base_stat;
      if (s.stat.name === 'defense') statsMap[StatType.DEFENSE] = s.base_stat;
      if (s.stat.name === 'speed') statsMap[StatType.SPEED] = s.base_stat;
    });

    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      stats: statsMap,
    };

    return pokemon;
  } catch (error) {
    console.error("Failed to fetch pokemon", error);
    // Return a fallback Magikarp in case of severe API failure to prevent crash
    return {
      id: 129,
      name: 'magikarp',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png',
      types: ['water'],
      stats: { hp: 20, attack: 10, defense: 55, speed: 80 }
    };
  }
};