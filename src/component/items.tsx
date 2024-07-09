import React from "react";
import { useDispatch } from "react-redux";
import Todo from "../store/slices/slice";
import { deleteTodo, statusTodo } from "../store/slices/slice";
import icon from "../asset/icon.png";
import edit from "../asset/edit.png";

interface Todo {
  id: number;
  text: string;
  status: boolean;
}

interface TodoItem {
  todo: Todo;
  onEdit: (id: number) => void;
}

const Items: React.FC<TodoItem> = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex gap-8 justify-between w-[100%] items-center">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={todo.status}
            onChange={() => dispatch(statusTodo(todo.id))}
          />
          <p
            className="text-left w-[100%] "
            style={{ textDecoration: todo.status ? "line-through" : "none" }}
          >
            {todo.text}
          </p>
        </div>
        <div className="flex items-center gap-3 p-8">
          <button onClick={() => onEdit(todo.id)} className="w-4 h-4">
            <img
              src={edit}
              alt="img"
              className="w-[15px] h-[15px] "
              style={{ verticalAlign: "middle" }}
            />
          </button>
          <button onClick={() => dispatch(deleteTodo(todo.id))} className="w-4 h-4">
            <img
              src={icon}
              alt="img"
              className="w-[15px] h-[15px]"
              style={{ verticalAlign: "middle" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;

