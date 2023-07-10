import { useRecoilValue } from "recoil";
import CreateToDo from "./CrateToDo";
import { toDoSelector } from "../recoil";
import ToDo from "./Todo";

export default function ToDoList() {
  const [toDo, done, doing] = useRecoilValue(toDoSelector);
  return (
    <>
      <h1>To Dos</h1>
      <CreateToDo />
      <hr />
      <h2>To Do</h2>
      <ul>
        {toDo.map((item) => (
          <ToDo key={item.id} {...item} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((item) => (
          <ToDo key={item.id} {...item} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((item) => (
          <ToDo key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
}
