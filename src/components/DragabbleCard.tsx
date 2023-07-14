import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDragabbleCardProps {
  toDo: string;
  idx: number;
}

function DragabbleCard({ toDo, idx }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDo} index={idx} key={toDo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

export default React.memo(DragabbleCard);
