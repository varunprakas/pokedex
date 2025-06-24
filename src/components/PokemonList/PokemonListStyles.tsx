import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '0 32px',
      boxSizing: 'border-box',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: '0',
      backgroundColor: '#f5f5f5',
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      marginBottom: '16px',
      borderRadius: '8px',
      gap: '8px',
    },
    details: {
      '& p': {
        padding: '0px',
        margin: '0 0 5p x 0',
        fontSize: '16px',
        color: '#333',
        '& span': {
          color: '#555',
        }
      }
    },
    type: {
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: '#e0e0e0',
      margin: '4px',
      fontSize: '14px',
      color: '#333',
      textTransform: 'capitalize',
      border: '1px solid #ccc',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    search: {
      padding: '8px',
      width: '200px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      color: '#333'
    },
    types: {
      marginTop: '8px',
    },
    buttonSearch: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'transparent',
      cursor: 'default',
      color: '#006072',
      '&:hover': {
        backgroundColor: '#3ec3a2',
        color: '#fff',
      }
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '203px',
      textAlign: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)', // Scale up on hover  
      }
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      textTransform: 'capitalize',
      color: '#333',
    },
    pokemonList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '16px',
    },
    label: {
      color: '#555',
      display: 'inline-block',
      width: '120px',
      fontWeight: 'bold',
    },
  },
  { name: 'PokemonList' }
);

export default useStyles;