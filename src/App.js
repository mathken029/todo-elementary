import { useState } from "react";

function App() {
  // # 以下は、余裕があれば実施する項目です
  // ## ソート(ID、期限、ステータスで並べ替え)の追加
  // ## ステータス変更でスタイル変更（どういう動作かを確認する）
  // ## どれかのパーツのコンポーネント化

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ title: "", detail: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [idCount, setIdCount] = useState(1);

  function handleAddTodoTitleInputChange(e) {
    setTodo({ ...todo, title: e.target.value });
  }

  function handleAddTodoDetailInputChange(e) {
    setTodo({ ...todo, detail: e.target.value });
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();

    if (todo.title !== "") {
      setIdCount(idCount + 1);
      setTodos([
        ...todos,
        {
          id: idCount,
          timestamp: new Date(),
          title: todo.title.trim(),
          detail: todo.detail.trim(),
        },
      ]);
      setTodo({ title: "", detail: "" });
    } else {
      alert("タイトルを入力してください");
    }
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleEditTodoTitleInputChange(e) {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  }

  function handleEditTodoDetailInputChange(e) {
    setCurrentTodo({ ...currentTodo, detail: e.target.value });
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    const updatedItem = todos.map((todo) => {
      if (todo.timestamp === currentTodo.timestamp) {
        return currentTodo;
      } else {
        return todo;
      }
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleDeleteClick(timestamp) {
    const removeItem = todos.filter((todo) => {
      return todo.timestamp !== timestamp;
    });
    setTodos(removeItem);
  }

  return (
    <>
      {isEditing ? (
        <form>
          <h2>TODOの編集</h2>
          <label htmlFor="editTodoTitle">TODOのタイトル: </label>
          <input
            name="editTodoTitle"
            type="text"
            value={currentTodo.title}
            onChange={handleEditTodoTitleInputChange}
          />

          <label htmlFor="editTodoTitle">詳細(任意): </label>
          <input
            name="editTodoTitle"
            type="text"
            value={currentTodo.detail}
            onChange={handleEditTodoDetailInputChange}
          />

          <button onClick={handleEditFormSubmit}>更新</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </form>
      ) : (
        <form onSubmit={handleAddFormSubmit}>
          <h2>TODOの追加</h2>
          <label htmlFor="AddTodoTitle">TODOのタイトル: </label>
          <input
            name="AddTodoTitle"
            type="text"
            value={todo.title}
            onChange={handleAddTodoTitleInputChange}
          />

          <label htmlFor="AddTodoDetail">詳細(任意): </label>
          <input
            name="AddTodoDetail"
            type="text"
            value={todo.detail}
            onChange={handleAddTodoDetailInputChange}
          />

          <button type="submit">登録</button>
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.timestamp}>
            {todo.id} :{todo.title} {todo.detail}
            <select name="todoStatus">
              <option>未着手</option>
              <option>進行中</option>
              <option>完了</option>
            </select>
            <button onClick={() => handleEditClick(todo)}>編集</button>
            <button onClick={() => handleDeleteClick(todo.timestamp)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
