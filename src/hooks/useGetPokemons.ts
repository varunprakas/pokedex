import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  number: string;
  classification: string;
  maxCP: number;
  maxHP: number;
  weight: any;
  height: any;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  id: string;
  name: string;
  image: string;
  types: string[];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
  image:Pokemon['image'];
  types: Pokemon['types']
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({  value: p.id,
        label: p.name,
        image: p.image,
        types: p.types, })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
