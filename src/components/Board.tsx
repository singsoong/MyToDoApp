import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic, snapshot) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <BoardTitle>{boardId}</BoardTitle>
          <CardWrapper
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, idx) => (
              <DragabbleCard key={toDo} toDo={toDo} idx={idx} />
            ))}
            {magic.placeholder}
          </CardWrapper>
        </Wrapper>
      )}
    </Droppable>
  );
}

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const BoardTitle = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
`;

interface ICardWrapperProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const CardWrapper = styled.div<ICardWrapperProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

export default Board;
