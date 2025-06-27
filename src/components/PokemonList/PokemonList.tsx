import React from 'react';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { Button, CircularProgress } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import useStyles from './PokemonListStyles';
import { filterPokemonsByName } from '../Utils/pokemonUtils';
import { Outlet, useNavigate } from "react-router-dom";

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchVal, setSearchVal] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(pokemons);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const navigate = useNavigate();

  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSearchResults(pokemons);
  }, [pokemons]);

  React.useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    const handleScroll = () => {
      setShowBackToTop(node.scrollTop > 50);
    };
    node.addEventListener('scroll', handleScroll);
    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    setSearchVal('');
    setSearchResults(pokemons);
    document.querySelector('input')?.focus();
  };

  const getSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVal(value);
    setSearchResults(filterPokemonsByName(pokemons, value));
  };

  const handleClickOpen = (pkmn: Pokemon) => {
    navigate(`/pokemon/${pkmn.id}`);
  };
  return (
    <div className={classes.root} ref={listRef} style={{ overflowY: 'auto', height: '100vh' }}>
      <div className={classes.searchContainer}>
        <input
          onChange={getSearchKeyword}
          type="text"
          className={classes.search}
          placeholder="Search Pokemon"
          value={searchVal}
        />
        <button onClick={handleSearchClick} className={classes.buttonSearch}>Clear Search</button>
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <CircularProgress color="primary" />
        </div>
      )}
      {!loading && pokemons.length > 0 && searchResults.length === 0 && (
        <div>No pokemon found</div>
      )}
      <div className={classes.pokemonList}>
        {searchResults.map((pkmn) => (
          <div className={classes.card} key={pkmn.id}>
            <div className={classes.title}>{pkmn.name}</div>
            <img
              src={pkmn.image}
              alt={pkmn.name}
              title={pkmn.name}
              style={{ width: '100px', height: '100px' }}
            />
            <div className={classes.types}>
              {pkmn.types.map((type, index) => (
                <span key={index} className={classes.type}>
                  {type}
                </span>
              ))}
            </div>
            <br />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#006072',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#3ec3a2',
                },
              }}
              onClick={() => handleClickOpen(pkmn)}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          onClick={handleBackToTop}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 2000,
            backgroundColor: '#4ef4cb',
            color: '#fff',
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
      <Outlet />
    </div>
  );
};