import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    // TODO 3. 프론트엔드 검증
    //  - 입력이 비었거나 공백뿐이면 안내 문구를 보여 주고 요청을 보내지 않는다.

    try {
      // TODO 4. 서버에 등록 요청 보내기
      //  - POST /api/todos · 본문은 JSON 형식의 { text } · Content-Type 헤더를 붙인다.
      //  - 응답 본문을 JSON 으로 읽는다.

      // TODO 5. 응답에 따라 화면 바꾸기
      //  - 실패(res.ok 가 false): 서버가 보낸 message 를 안내로 보여 준다.
      //  - 성공: 서버가 돌려준 항목을 목록에 붙이고, 입력칸과 안내를 비운다.
    } catch {
      setError("서버에 연결할 수 없습니다. 서버가 켜져 있는지 확인해 주세요.");
    }
  }

  return (
    <main className="app">
      <h1>할 일</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="할 일을 입력하세요"
          aria-invalid={error !== ""}
        />
        <button type="submit">등록</button>
      </form>

      <p className="error" role="alert">
        {error}
      </p>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </main>
  );
}
