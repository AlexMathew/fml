import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Team from "./Team";

const grid = 8;

const getItemStyle = draggableStyle => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: "white",

  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 400
});

class DraggableSelection extends React.Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.teams.map((team, index) => (
                <Draggable
                  key={team.node.id}
                  draggableId={team.node.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                    >
                      <Team index={index} team={team.node} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DraggableSelection;
