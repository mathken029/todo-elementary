import { useState } from "react";

function App() {
  // # 上から順番に機能追加していきます

  // ## TODO項目へのステータス(未着手、進行中、完了 など)の追加
  // * まず、プルダウンリストをリストの表示項目に追加します
  // * 初期値は「未着手」にして、進行中、完了にステータスを切り替えられるようにします

  // ## TODO項目への詳細の追加
  // * TODOの作成の際に、入力が任意の詳細を入力するためのテキストボックスを追加します
  // * TODO項目のタイトルと同様にラベルで表示します
  // * ボタン「編集」を入力した際に詳細も編集できるようにします

  // # 以下は、余裕があれば実施する項目です
  // ## ソート(ID、期限、ステータスで並べ替え)の追加
  // ## ステータス変更でスタイル変更（どういう動作かを確認する）
  // ## どれかのパーツのコンポーネント化

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [idCount, setIdCount] = useState(1);

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setIdCount(idCount + 1);
      setTodos([
        ...todos,
        {
          id: idCount,
          timestamp: new Date(),
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
            placeholder="TODOを入力してください"
            value={todo}
            onChange={handleAddInputChange}
          />
        </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.timestamp}>
            {todo.id} :{todo.text}
            <select name="todoStatus">
              <option>未着手</option>
              <option>進行中</option>
              <option>完了</option>
            </select>
            <button>編集</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
