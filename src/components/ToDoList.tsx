import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CrateToDo";
import { categoryState, toDoSelector } from "../recoil";
import ToDo from "./Todo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos.map((item) => (
        <ToDo key={item.id} {...item} />
      ))}
    </div>
  );
}
