// 問題を生成するための関数
function generateQuestions() {
  // 0 から 99 の間のランダムな数字を生成
  const rowValues = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  const colValues = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

  // 問題のテーブルを生成
  const table = document.getElementById("question-table");
  for (let i = 0; i < 10; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 10; j++) {
      const cell = row.insertCell();
      // 最初の行と最初の列にはランダムな数字を表示
      if (i === 0 && j === 0) {
        cell.innerHTML = "+";
      } else if (i === 0 && j > 0) {
        cell.innerHTML = colValues[j - 1];
        cell.setAttribute("id", `col-${j}`);
      } else if (j === 0 && i > 0) {
        cell.innerHTML = rowValues[i - 1];
        cell.setAttribute("id", `row-${i}`);
      } else {
        // テキストボックスを追加
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("answer-input");
        input.setAttribute("data-row", i);
        input.setAttribute("data-col", j);
        cell.appendChild(input);
      }
    }
  }

  // チェックボタンの表示
  const button = document.createElement("button");
  button.innerHTML = "チェック";
  button.addEventListener("click", checkAnswers);
  document.getElementById("check-button").appendChild(button);
}

// 回答をチェックするための関数
function checkAnswers() {
  let allCorrect = true;
  const inputs = document.getElementsByClassName("answer-input");

  // 各マスに対して回答をチェック
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const row = input.getAttribute("data-row");
    const col = input.getAttribute("data-col");
    const actual = parseInt(input.value, 10) || 0;
    const expected = parseInt(document.getElementById(`col-${col}`).innerHTML, 10) + parseInt(document.getElementById(`row-${row}`).innerHTML, 10);
    const cell = input.parentElement;

    // 正解だった場合は緑色、不正解だった場合は赤色にする
    if (actual === expected) {
      cell.classList.remove("answer-incorrect");
      cell.classList.add("answer-correct");
    } else {
      cell.classList.remove("answer-correct");
      cell.classList.add("answer-incorrect");
      allCorrect = false;
    }
  }

  // 全問正解の場合
  if (allCorrect) {
    const button = document.getElementById("check-button").firstChild;
    button.innerHTML = "全問正解！次の問題へ";

    // 新しい問題を生成
    const table = document.getElementById("question-table");
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
    generateQuestions();
  }
  // 全問正解でない場合
  else {
    const message = document.getElementById("message");
    message.innerHTML = "もう一度挑戦してみよう";
  }
}

// 最初の問題を生成
generateQuestions();

