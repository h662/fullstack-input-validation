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

    if (text.trim() === "") {
      setError("할 일 내용을 입력해 주세요.");
      return;
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setTodos((prev) => [...prev, data]);
      setText("");
      setError("");
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
