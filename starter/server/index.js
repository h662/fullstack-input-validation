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
  // 본문이 없으면 req.body 가 undefined 일 수 있어서 ?. 로 읽는다.
  const text = req.body?.text;

  // TODO 1. 서버 검증
  //  - text 가 문자열이 아니면 400 과 { message } 를 보내고 끝낸다.
  //  - 앞뒤 공백을 지운 값이 비어 있으면 400 과 { message } 를 보내고 끝낸다.
  //  - 힌트: 응답을 보낸 뒤에도 함수는 아래로 계속 실행된다.

  // TODO 2. 저장과 성공 응답
  //  - 공백을 지운 값으로 { id, text } 를 만들어 todos 에 넣는다. (id 는 nextId 사용)
  //  - 201 과 함께 저장한 항목을 돌려준다.

  // TODO 1, 2 를 끝내면 아래 줄을 지운다.
  res.status(501).json({ message: "아직 구현하지 않았습니다." });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
