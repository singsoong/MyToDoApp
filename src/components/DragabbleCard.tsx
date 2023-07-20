import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { useState } from "react";
import { ReactComponent as Delete } from "../images/deleteBin.svg";
import { toDoState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  idx: number;
  boardId: string;
}

function DragabbleCard({
  toDoId,
  toDoText,
  idx,
  boardId,
}: IDragabbleCardProps) {
  const [isHover, setIsHover] = useState(false);
  const setToDos = useSetRecoilState(toDoState);

  const onDelete = () => {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy.splice(idx, 1);
      return { ...allBoards, [boardId]: boardCopy };
    });
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
          {toDoText}
          {isHover && <DeleteBtn onClick={onDelete} />}
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

const DeleteBtn = styled(Delete)`
  float: right;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #8080803d;
  }
`;

export default React.memo(DragabbleCard);
