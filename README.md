# fullstack-input-validation

React 화면과 Express 서버를 연결해 할 일 하나를 등록하고, 입력값을 화면과 서버에서 각각 검증하는 실습입니다.

- `starter/` 시작 코드 (TODO 1~5를 채웁니다)
- `solution/` 예시 풀이

## 실행 방법

Node.js 26(LTS) 버전을 사용합니다.

```bash
git clone https://github.com/h662/fullstack-input-validation.git
cd fullstack-input-validation/starter
```

터미널 1: 서버 (http://localhost:3000)

```bash
cd server
npm install
npm run dev
```

터미널 2: 화면 (http://localhost:5173)

```bash
cd client
npm install
npm run dev
```

터미널 3: 서버 검증 확인 (서버가 켜져 있어야 합니다)

```bash
cd server
npm run check
```

시작 코드에서는 7개 모두 FAIL이 정상입니다. 실습을 마치면 모두 PASS가 됩니다.
