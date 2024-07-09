import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Items from "./items";
import { addTodo, editTodo } from "../store/slices/slice";
import Header from "./header";
import saver from "../asset/saver.png";

const InputTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleEdit = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todos) {
      setEditingId(id);
      setEditingText(todo?.text as string);
    }
  };

  const handleSave = () => {
    if (editingId !== null && editingText.trim()) {
      dispatch(editTodo({ id: editingId, text: editingText }));
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div>
      <div
        className="md:w-[50%] md:mx-auto bg-[#f8f9fd] p-8 mt-16 flex flex-col justify-center items-center gap-12 mb-12"
        style={{ boxShadow: "3px 10px 13px -2px rgba(0, 0, 0, 0.27)" }}
      >
        <Header />
        <div
          className="flex justify-between items-center bg-white p-4 w-[90%] m-[2rem auto] mt-5"
          style={{ boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)" }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add me.."
            style={{ outline: "0", border: "none" }}
            className="w-[90%] h-4 p-[15px]"
          />
          <button
            className="bg-[#017bfe] text-white w-11 cursor-pointer rounded-md p-[5px] text-sm"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <hr className="w-[100%]" style={{ border: "0.5px solid #e9e9e9" }} />
        {editingId !== null && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              style={{
                outline: "0",
                border: "none",
                boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
              }}
              className="w-[90%] h-4 p-[15px]"
            />
            <button onClick={handleSave}>
              <img
                src={saver}
                alt="img"
                className="w-[15px] h-[15px] "
                style={{ verticalAlign: "middle" }}
              />
            </button>
          </div>
        )}
        <div className="w-[100%] flex flex-col gap-4">
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <Items todo={todo} onEdit={handleEdit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputTodo;
