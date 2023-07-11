import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Droppable: 어떤 것을 드롭할 수 있는 영역
// Draggable: 드래그할 수 있는 영역

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one">
        {(magic) => (
          <ul ref={magic.innerRef} {...magic.droppableProps}>
            <Draggable draggableId="first" index={0}>
              {(magic) => (
                <li ref={magic.innerRef} {...magic.draggableProps}>
                  <span {...magic.dragHandleProps}>📌</span>
                  One
                </li>
              )}
            </Draggable>
            <Draggable draggableId="second" index={1}>
              {(magic) => (
                <li ref={magic.innerRef} {...magic.draggableProps}>
                  <span {...magic.dragHandleProps}>📌</span>
                  Two
                </li>
              )}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
