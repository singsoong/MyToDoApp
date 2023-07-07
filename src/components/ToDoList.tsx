import { useRecoilValue } from "recoil";
import CreateToDo from "./CrateToDo";
import { toDoState } from "../recoil";
import ToDo from "./Todo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}
