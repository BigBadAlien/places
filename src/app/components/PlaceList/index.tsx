import * as React from 'react';
import * as style from './style.css';
import { Place } from '../../models/Place';

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle, ResponderProvided
} from 'react-beautiful-dnd';

interface Props {
  places: Place[];
  columns: string[];
}


const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'gray' : '#fff',
});

const getItemStyle = (isDragging: boolean, draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  background: isDragging ? 'lightgreen' : '#fff',
  ...draggableStyle,
});

export const PlaceList: React.SFC<Props> = (props) => {
  return <div className={style.container}>
    <div className={style.row}>
      {props.columns
        .map((key) => <div className={style.header} key={key}>{key}</div>)}
    </div>
    <DragDropContext onDragEnd={(result: DropResult, provided: ResponderProvided) => {
      console.log('onDragEnd', result, provided);
    }}>
      <Droppable droppableId='droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className={style.row}
            {...provided.droppableProps}
          >
            {props.columns
              .map((key, columnIndex) => (
                <Draggable key={columnIndex} draggableId={columnIndex + ''} index={columnIndex}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={style.col}
                    >
                      {props.places.map((item, placeIndex) => (
                        <div key={placeIndex}>{item[columnIndex as keyof Place]}</div>
                      ))}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>;
};
//
