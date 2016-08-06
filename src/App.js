import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Dancer from './Dancer';
import { moveDancer } from './actions';

let Scene = ({ width, bg, dancers, onDancerDragged }) => (
  <div className="scene">
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
    <img className="bg" src={bg.url} style={{width}} alt="background" />
  </div>
)

Scene = connect(
  (state) => ({
    width: 800,
    bg: state.scenes[0],
    dancers: state.dancers,
  }),
  { onDancerDragged: moveDancer }
)(Scene);

class App extends Component {
  render() {
    return (
        <Scene />
    );
  }
}

export default App;
