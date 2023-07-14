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
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <BoardTitle>{boardId}</BoardTitle>
          {toDos.map((toDo, idx) => (
            <DragabbleCard key={toDo} toDo={toDo} idx={idx} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`;

const BoardTitle = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
`;

export default Board;