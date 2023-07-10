import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const selectCategoryOnClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteOnClick = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => selectCategoryOnClick(Categories.DOING)}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => selectCategoryOnClick(Categories.TO_DO)}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => selectCategoryOnClick(Categories.DONE)}>
          Done
        </button>
      )}
      <button onClick={deleteOnClick}>Delete</button>
    </li>
  );
}

export default ToDo;
