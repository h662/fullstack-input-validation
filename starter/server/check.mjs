// 화면을 거치지 않고 서버에 직접 요청을 보내서 서버 검증을 확인한다.
// 사용법: 서버를 켠 상태에서 다른 터미널에서  npm run check
const BASE = 'http://localhost:3000/api/todos';

async function countTodos() {
  const res = await fetch(BASE);
  const list = await res.json();
  return list.length;
}

async function post(body, withJsonHeader = true) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: withJsonHeader ? { 'Content-Type': 'application/json' } : {},
    body,
  });
  return res.status;
}

const cases = [
  { name: '정상 입력', body: JSON.stringify({ text: '우유 사기' }), expect: 201 },
  { name: '빈 문자열', body: JSON.stringify({ text: '' }), expect: 400 },
  { name: '공백만', body: JSON.stringify({ text: '    ' }), expect: 400 },
  { name: 'text 없음', body: JSON.stringify({}), expect: 400 },
  { name: '숫자', body: JSON.stringify({ text: 123 }), expect: 400 },
  { name: '본문 없음', body: undefined, expect: 400, withJsonHeader: false },
];

try {
  const before = await countTodos();
  const rows = [];

  for (const c of cases) {
    const status = await post(c.body, c.withJsonHeader ?? true);
    rows.push({
      경우: c.name,
      기대: c.expect,
      실제: status,
      결과: status === c.expect ? 'PASS' : 'FAIL',
    });
  }

  const after = await countTodos();
  const added = after - before;
  rows.push({
    경우: '저장된 개수',
    기대: '+1',
    실제: `+${added}`,
    결과: added === 1 ? 'PASS' : 'FAIL',
  });

  console.table(rows);
  const failed = rows.filter((r) => r.결과 === 'FAIL').length;
  console.log(failed === 0 ? '모두 통과' : `실패 ${failed}건 — 위 표에서 FAIL 줄을 확인하세요`);
} catch {
  console.log('서버에 연결할 수 없습니다. 먼저 서버를 켜 주세요: npm run dev');
}
