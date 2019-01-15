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
}


const filterColumnsByKey = (key: string) => key !== 'id';

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
      {props.places[0] && Object.keys(props.places[0])
        .filter(filterColumnsByKey)
        .map((key) => <div className={style.header} key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>)}
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
            {props.places[0] && Object.keys(props.places[0])
              .filter(filterColumnsByKey)
              .map((key, index) => (
                <Draggable key={key} draggableId={key} index={index}>
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
                      {props.places.map((item, index) => (
                        <div key={index}>{item[key as keyof Place]}</div>
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
