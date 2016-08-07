import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './App.css';
import Dancer from './Dancer';
import { moveDancer } from './actions';

const Background = ({ width, bg, children }) => (
  <div className="scene">
    {children}
    <img className="bg" src={bg.url} style={{width}} alt="background" />
  </div>
);

export let Scene = ({ width, bg, dancers, onDancerDragged }) => (
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
);

Scene = withRouter(connect(
  (state, { params }) => ({
    width: 800,
    bg: state.scenes[params.sceneId],
    dancers: state.dancers,
  }),
  { onDancerDragged: moveDancer }
)(Scene));

export let Scenes = ({ scenes }) => (
  <ul>
    {scenes.map((scene, i) =>
      <a key={i} href={`/${i}`}>
        <Background width={200} bg={scene} />
      </a>
    )}
  </ul>
);
Scenes = connect(
  (state) => ({ scenes: state.scenes }),
  { onDancerDragged: moveDancer }
)(Scenes);
