import React from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import './Dancer.css';

const Dancer = ({src, x, y, height, onDragged }) => {
  const width = 100;
  return (
    <ResizableAndMovable
      x={x - width / 2}
      y={y}
      height={height}
      width={width}
      onResizeStop={(direction, styleSize, clientSize, delta) => {
        onDragged(x, direction === 'top' ? y - delta.height : y, styleSize.height);
      }}
      onDragStop={(event, ui) => {
        onDragged(ui.position.left + width / 2, ui.position.top, height);
      }}
      minWidth={100}
      minHeight={100}
      isResizable={{ top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
      bounds={'parent'}
      className="dancer"
    >
      <img src={src} alt="dancer" />
    </ResizableAndMovable>
  );
};

export default Dancer;