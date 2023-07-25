import { Draggable } from "react-beautiful-dnd";
import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import { ReactComponent as Delete } from "../images/deleteBin.svg";
import { ReactComponent as Edit } from "../images/edit.svg";
import { toDoState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
  boardId: string;
}

interface IInput {
  toDo: string;
}

function DragabbleCard({
  toDoId,
  toDoText,
  idx,
  boardId,
}: IDragabbleCardProps) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setFocus } = useForm<IInput>({
    defaultValues: {
      toDo: toDoText,
    },
  });

  const onDelete = () => {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy.splice(idx, 1);
      return { ...allBoards, [boardId]: boardCopy };
    });
  };

  const onEdit = () => {
    setIsEdit((prev) => !prev);
    setTimeout(() => {
      setFocus("toDo");
    }, 100);
  };

  const onValid = ({ toDo }: IInput) => {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      const newToDo = {
        id: boardCopy[idx].id,
        text: toDo,
      };
      boardCopy[idx] = newToDo;
      return { ...allBoards, [boardId]: boardCopy };
    });
    setIsEdit((prev) => !prev);
  };

  return (
    <Draggable draggableId={toDoId + ""} index={idx} key={toDoId}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseOut={() => {
            setIsHover(false);
          }}
        >
          {isEdit ? (
            <form onSubmit={handleSubmit(onValid)}>
              <EditInput {...register("toDo")} />
            </form>
          ) : (
            <>{toDoText}</>
          )}

          {isHover && (
            <BtnContainer>
              <EditBtn onClick={onEdit} />
              <DeleteBtn onClick={onDelete} />
            </BtnContainer>
          )}
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

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 5px;
  animation: ${fadeInAnimation} 0.5s ease;
`;

const DeleteBtn = styled(Delete)`
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #8080803d;
  }
`;

const EditBtn = styled(Edit)`
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #8080803d;
  }
`;

const EditInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

export default React.memo(DragabbleCard);
