import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
}

function DragabbleCard({ toDoId, toDoText, idx }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={idx} key={toDoId}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

export default React.memo(DragabbleCard);
