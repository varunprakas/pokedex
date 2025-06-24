import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  image: string;
  types: string[];
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
  image: Pokemon['image'];
  types: string[];
  number: string;
  classification: string;
  maxCP: number;
  maxHP: number;
};

export const GET_POKEMONS_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id?: string, name?: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS_DETAILS, {
    variables: {
      id,
      name,
    },
    skip: !id && !name,
  });

  const pokemon: Pokemon | undefined = useMemo(() => data?.pokemon, [data]);

  const pokemonOption: PokemonOption | undefined = useMemo(
    () =>
      pokemon
        ? {
            value: pokemon.id,
            label: pokemon.name,
            image: pokemon.image,
            types: pokemon.types,
            number: pokemon.number,
            classification: pokemon.classification,
            maxCP: pokemon.maxCP,
            maxHP: pokemon.maxHP,
          }
        : undefined,
    [pokemon]
  );

  return {
    pokemon,
    pokemonOption,
    ...queryRes,
  };
};