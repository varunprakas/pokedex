import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonsDetails';
import useStyles from './PokemonListStyles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const PokemonDialog: React.FC = () => {
  const { id } = useParams<'id'>();
  const { pokemon, loading } = useGetPokemonDetails(id || undefined);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClose = () => {
    navigate('/pokemon');
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={classes.title}>
        {pokemon ? pokemon.name : 'Pokémon Details'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        className='closeButton'
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          backgroundColor: '#006072',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#3ec3a2',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {loading && <Typography>Loading details...</Typography>}
        {pokemon && (
          <div className={classes.details}>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
            <p><span className={classes.label}>Number: </span><span>{pokemon.number}</span></p>
            <p><span className={classes.label}>Types: </span><span>{pokemon.types.join(', ')}</span></p>
            <p><span className={classes.label}>Classification: </span><span>{pokemon.classification}</span></p>
            <p><span className={classes.label}>Max CP: </span><span>{pokemon.maxCP}</span></p>
            <p><span className={classes.label}>Max HP: </span><span>{pokemon.maxHP}</span></p>
            <p><span className={classes.label}>Weight: </span><span>{pokemon.weight.minimum} - {pokemon.weight.maximum}</span></p>
            <p><span className={classes.label}>Height: </span><span>{pokemon.height.minimum} - {pokemon.height.maximum}</span></p>
            <p><span className={classes.label}>Resistant: </span><span>{pokemon.resistant.join(', ')}</span></p>
            <p><span className={classes.label}>Weaknesses: </span><span>{pokemon.weaknesses.join(', ')}</span></p>
            <p><span className={classes.label}>Flee Rate: </span><span>{pokemon.fleeRate}</span></p>
          </div>
        )}
        {!loading && !pokemon && (
          <Typography gutterBottom>
            Select a Pokémon to see details
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};