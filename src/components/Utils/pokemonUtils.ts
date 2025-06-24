
import { Pokemon } from '../../hooks/useGetPokemons';
export function filterPokemonsByName(pokemons: Pokemon[], searchVal: string): Pokemon[] {
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchVal.toLowerCase())
  );
}