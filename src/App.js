import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();
    console.log(todo);

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: new Date(),
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  return (
    <>
      {isEditing ? (
        <form>
          <h2>TODOの編集</h2>
          <label>TODOの更新: </label>
          <input />
          <button>更新</button>
          <button>キャンセル</button>
        </form>
      ) : (
        <form onSubmit={handleAddFormSubmit}>
          <h2>TODOの追加</h2>
          <label htmlFor="todo">TODOの作成: </label>
          <input
            name="todo"
            type="text"
            placeholder="新しいTODOを作成してください"
            value={todo}
            onChange={handleAddInputChange}
          />
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button>編集</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
