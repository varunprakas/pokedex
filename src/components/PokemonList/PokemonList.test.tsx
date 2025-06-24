import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { PokemonList } from './PokemonList';
import * as useGetPokemonsModule from '../../hooks/useGetPokemons';
import * as useGetPokemonDetailsModule from '../../hooks/useGetPokemonsDetails';

// Mock the styles and dialog
jest.mock('./PokemonDialog', () => () => <div data-testid="pokemon-dialog" />);
jest.mock('./PokemonListStyles', () => () => ({}));

// Mock data
const mockPokemons = [
  {
    id: '1',
    name: 'Bulbasaur',
    image: 'bulbasaur.png',
    types: ['Grass', 'Poison'],
  },
  {
    id: '2',
    name: 'Charmander',
    image: 'charmander.png',
    types: ['Fire'],
  },
];

describe('PokemonList', () => {
  beforeEach(() => {
    jest.spyOn(useGetPokemonsModule, 'useGetPokemons').mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
    } as any);

    jest.spyOn(useGetPokemonDetailsModule, 'useGetPokemonDetails').mockReturnValue({
      pokemon: mockPokemons[0],
      loading: false,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and pokemons', () => {
    render(<PokemonList />);
    expect(screen.getByPlaceholderText(/search pokemon/i)).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('filters pokemons by search', () => {
    render(<PokemonList />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    fireEvent.change(input, { target: { value: 'bulb' } });
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('shows "No pokemon found" when search yields no results', () => {
    render(<PokemonList />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    fireEvent.change(input, { target: { value: 'xyz' } });
    expect(screen.getByText(/no pokemon found/i)).toBeInTheDocument();
  });

  it('opens dialog when Details button is clicked', async () => {
    render(<PokemonList />);
    const detailsButton = screen.getAllByText('Details')[0];
    fireEvent.click(detailsButton);
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-dialog')).toBeInTheDocument();
    });
  });

  it('shows loading spinner when loading', () => {
    jest.spyOn(useGetPokemonsModule, 'useGetPokemons').mockReturnValue({
      pokemons: [],
      loading: true,
    } as any);
    render(<PokemonList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });