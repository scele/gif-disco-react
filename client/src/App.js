import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './App.css';
import Dancer from './Dancer';
import { moveDancer, addDancer, saveScene } from './actions';

const Background = ({ width, scene, children }) => {
  let bg = <img className="bg" src={scene.url} style={{width}} alt="background" />;
  if (scene.url.endsWith('.mp4')) {
    bg = (
      <video width={width} height={width / (1280/720)} src={scene.url} autoPlay loop>
          Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <div className="scene">
      {children}
      {bg}
    </div>
  );
};

let SceneBase = ({ width, scene, dancers, onDancerDragged, onAddNewDancer, onSave }) => {
  if (typeof scene === 'undefined' || typeof dancers === 'undefined')
    return <div>Loading...</div>;
  return (
    <div className="scene-outer">
      <Background width={width} scene={scene}>
        {scene.gifs.map((dancer, i) =>
          <Dancer
            key={i}
            src={dancers[i]}
            onDragged={(...args) => onDancerDragged(i, ...args)}
            x={width * dancer.position.left}
            y={width * (dancer.position.top)}
            height={width * dancer.height}
          />
        )}
      </Background>
      <button onClick={ e => { e.preventDefault(); onAddNewDancer(); } }>
        Add Dancer
      </button>
      <button onClick={ e => { e.preventDefault(); onSave(scene); } } disabled={!scene.dirty}>
        Save
      </button>
    </div>
  );
};

SceneBase = connect(
  (state, { params }) => ({
    scene: state.scenes[params.sceneId],
    dancers: state.dancers,
  }),
  (dispatch, { width, params }) => ({
    onDancerDragged: (dancerId, x, y, height) => dispatch(moveDancer(params.sceneId, dancerId, x / width, y / width, height / width)),
    onAddNewDancer: () => dispatch(addDancer(params.sceneId)),
    onSave: (...args) => dispatch(saveScene(params.sceneId, ...args))
  })
)(SceneBase);

export let SceneEditor = ({params}) => (
  <div>
    <SceneListing />
    <SceneBase width={800} params={params} />
  </div>);

export let SceneListing = ({ scenes }) => (
  <ul>
    {scenes.map((scene, i) =>
      <Link key={i} to={`/${i}`}>
        <Background width={200} scene={scene}>
          <span className="label">{scene.dirty ? '* ' : ''}{scene.gifs.length}</span>
        </Background>
      </Link>
    )}
  </ul>
);
SceneListing = connect(
  (state) => ({ scenes: state.scenes })
)(SceneListing);
