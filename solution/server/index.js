import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const todos = [];
let nextId = 1;

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const text = req.body?.text;

  if (typeof text !== "string") {
    return res
      .status(400)
      .json({ message: "할 일 내용을 문자열로 보내 주세요." });
  }

  const trimmed = text.trim();
  if (trimmed === "") {
    return res.status(400).json({ message: "할 일 내용을 입력해 주세요." });
  }

  const todo = { id: nextId++, text: trimmed };
  todos.push(todo);
  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
