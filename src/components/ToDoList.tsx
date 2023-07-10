import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CrateToDo";
import { Categories, categoryState, toDoSelector } from "../recoil";
import ToDo from "./Todo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(Number(event.currentTarget.value) as number);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((item) => (
        <ToDo key={item.id} {...item} />
      ))}
    </div>
  );
}
