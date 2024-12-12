let answer = generateAnswer();
let attempts = 0;

function generateAnswer() {
    let numbers = Array.from({ length: 10 }, (_, i) => i); // 0-9的數字陣列
    let result = [];
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * numbers.length);
        result.push(numbers[index]);
        numbers.splice(index, 1); 
    }
    return result.join('');
}

function checkGuess() {
    const guess = document.getElementById('guess').value;
    if (!validateInput(guess)) {
        alert('請輸入不重複的4位數字！');
        return;
    }

    attempts++;
    const result = calculateResult(guess);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `<p>${guess}: ${result}</p>`;

    if (result === '4A0B') {
        alert(`恭喜猜對！總共嘗試次數：${attempts}`);
        resetGame();
    } else {
        document.getElementById('guess').value = '';
    }
}

function validateInput(input) {
    if (input.length !== 4 || isNaN(input)) return false;
    const uniqueDigits = new Set(input);
    return uniqueDigits.size === 4;
}

function calculateResult(guess) {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === answer[i]) {
            A++;
        } else if (answer.includes(guess[i])) {
            B++;
        }
    }
    return `${A}A${B}B`;
}

function resetGame() {
    answer = generateAnswer();
    attempts = 0;
    document.getElementById('results').innerHTML = '';
    document.getElementById('guess').value = '';
}
