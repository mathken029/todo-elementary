import { useState } from "react";

function App() {
  // # 上から順番に機能追加していきます

  // ## TODO項目への詳細の追加
  // * TODOの作成の際に、入力が任意の詳細を入力するためのテキストボックスを追加します
  // * TODO項目のタイトルと同様にラベルで表示します

  // ## TODOの編集機能の追加
  // * 過去のソースコードを参考に追加します
  // * ボタン「編集」を入力した際に詳細も編集できるようにします

  // # 以下は、余裕があれば実施する項目です
  // ## ソート(ID、期限、ステータスで並べ替え)の追加
  // ## ステータス変更でスタイル変更（どういう動作かを確認する）
  // ## どれかのパーツのコンポーネント化

  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [idCount, setIdCount] = useState(1);

  function handleAddTodoTitleInputChange(e) {
    setTodoTitle(e.target.value);
  }

  function handleAddTodoDetailInputChange(e) {
    setTodoDetail(e.target.value);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();
    console.log("title:" + todoTitle);
    console.log("detail:" + todoDetail);

    if (todoTitle !== "") {
      setIdCount(idCount + 1);
      setTodos([
        ...todos,
        {
          id: idCount,
          timestamp: new Date(),
          title: todoTitle.trim(),
          detail: todoDetail.trim(),
        },
      ]);
    }

    setTodoTitle("");
    setTodoDetail("");
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
          <label htmlFor="todoTitle">TODOのタイトル: </label>
          <input
            name="todoTitle"
            type="text"
            value={todoTitle}
            onChange={handleAddTodoTitleInputChange}
          />

          <label htmlFor="todoDetail">詳細(任意): </label>
          <input
            name="todoDetail"
            type="text"
            value={todoDetail}
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
            <button>編集</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
