import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./recoil/atoms";
import Board from "./components/Board";
import { ReactComponent as Add } from "./images/addBoard.svg";

// Droppable: 어떤 것을 드롭할 수 있는 영역
// Draggable: 드래그할 수 있는 영역

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;

    // same board
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // cross board
    else {
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };

  const onAddBoard = () => {
    const newBoard = window.prompt("새롭게 생성할 보드 이름을 입력해주세요.");
    if (newBoard) {
      setToDos((allBoards) => {
        return { ...allBoards, [newBoard]: [] };
      });
    }
  };

  return (
    <Wrapper>
      <BtnWrapper>
        <AddBoardBtn onClick={onAddBoard} />
      </BtnWrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
}

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const AddBoardBtn = styled(Add)`
  position: absolute;
  top: 50px;
  right: 0;
  cursor: pointer;
  background-color: #dfe6e9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  &:hover {
    background-color: #2e7db364;
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

export default App;
