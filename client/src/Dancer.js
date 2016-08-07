import React, { Component } from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import './Dancer.css';

export default class Dancer extends Component {
  constructor(props) {
    super(props);
    this.state = { x: props.x, y: props.y, height: props.height, width: 100 };
  }
  onResizeStop(direction, styleSize, clientSize, delta) {
      this.setState({ height: styleSize.height });
      if (direction === 'top')
        this.setState({ y: this.state.y - delta.height});
      this.props.onDragged(this.state.x, this.state.y, styleSize.height);
  }
  onDragStop(event, ui) {
      this.setState({ x: ui.position.left + this.state.width / 2, y: ui.position.top });
      this.props.onDragged(this.state.x, this.state.y, this.state.height);
  }
  render() {
    return (
      <ResizableAndMovable
        x={this.state.x - this.state.width / 2}
        y={this.state.y}
        height={this.state.height}
        width={this.state.width}
        onResizeStop={this.onResizeStop.bind(this)}
        onDragStop={this.onDragStop.bind(this)}
        minWidth={100}
        minHeight={100}
        isResizable={{ top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        bounds={'parent'}
        className="dancer"
     >
        <img src={this.props.src} alt="dancer" />
     </ResizableAndMovable>
    );
  }
}
