import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { ReactComponent as Delete } from "../images/deleteBin.svg";
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const [isHover, setIsHover] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = (data: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: data.toDo,
    };
    setToDos((allBoards) => {
      return { ...allBoards, [boardId]: [...allBoards[boardId], newToDo] };
    });
    setValue("toDo", "");
  };

  const onDelete = () => {
    setToDos((allBoards) => {
      const copyBoard = { ...allBoards };
      delete copyBoard[boardId];
      return copyBoard;
    });
  };

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
    >
      <BoardTopContainer>
        <TitleContainer>
          <BoardTitle>{boardId}</BoardTitle>
          {isHover && (
            <BtnContainer>
              <DeleteBtn onClick={onDelete} />
            </BtnContainer>
          )}
        </TitleContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo", { required: true })}
            type="text"
            placeholder={`Add Task on ${boardId}`}
          />
        </Form>
      </BoardTopContainer>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            <CardWrapper
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            >
              {toDos.map((toDo, idx) => (
                <DragabbleCard
                  key={toDo.id}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                  boardId={boardId}
                  idx={idx}
                />
              ))}
              {magic.placeholder}
            </CardWrapper>
          </Wrapper>
        )}
      </Droppable>
    </div>
  );
}

const BoardTopContainer = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

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
      ? "#b2bec3"
      : props.isDraggingFromThis
      ? "#dfe6e9"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const DeleteBtn = styled(Delete)`
  cursor: pointer;
  border-radius: 5px;
  margin-left: 7px;
  &:hover {
    background-color: #8080803d;
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  animation: ${fadeInAnimation} 0.5s ease;
`;

export default Board;
