import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import './App.css';
import Dancer from './Dancer';
import { moveDancer, addDancer } from './actions';

const Background = ({ width, bg, children }) => (
  <div className="scene">
    {children}
    <img className="bg" src={bg.url} style={{width}} alt="background" />
  </div>
);

export let Scene = ({ width, bg, dancers, onDancerDragged, onAddNewDancer }) => {
  if (typeof bg === 'undefined')
    return <div>Loading...</div>;
  return (
    <div>
      <Background width={width} bg={bg}>
        {bg.gifs.map((dancer, i) =>
          <Dancer
            key={i}
            src={dancers[i]}
            onDragged={(...args) => onDancerDragged(i, ...args)}
            x={100}
            y={100}
            height={200}
          />
        )}
      </Background>
      <button onClick={ e => { e.preventDefault(); onAddNewDancer(); } }>
        Add Dancer
      </button>
    </div>
  );
};

Scene = withRouter(connect(
  (state, { params }) => ({
    width: 800,
    bg: state.scenes[params.sceneId],
    dancers: state.dancers,
  }),
  (dispatch, { params }) => ({
    onDancerDragged: moveDancer,
    onAddNewDancer: () => dispatch(addDancer(params.sceneId))
  })
)(Scene));

export let Scenes = ({ scenes }) => (
  <ul>
    {scenes.map((scene, i) =>
      <Link key={i} to={`/${i}`}>
        <Background width={200} bg={scene} />
      </Link>
    )}
  </ul>
);
Scenes = connect(
  (state) => ({ scenes: state.scenes }),
  { onDancerDragged: moveDancer }
)(Scenes);
