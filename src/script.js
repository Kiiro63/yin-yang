const numRows = 20; // Количество строк
const numCols = 20; // Количество столбцов
const cellSize = 20; // Размер ячейки
const delay = 200; // Задержка между шагами игры (в миллисекундах)

let grid = []; // Массив сетки

// Функция для создания начальной сетки
function createGrid() {
    for (let row = 0; row < numRows; row++) {
        grid[row] = [];
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", "dead");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", toggleCellState);
            document.querySelector(".game-container").appendChild(cell);
            grid[row][col] = 0;
        }
    }
}

// Функция для изменения состояния ячейки по клику
function toggleCellState(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (cell.classList.contains("dead")) {
        cell.classList.remove("dead");
        cell.classList.add("yin");
        grid[row][col] = 1;
    } else if (cell.classList.contains("yin")) {
        cell.classList.remove("yin");
        cell.classList.add("yang");
        grid[row][col] = 2;
    } else {
        cell.classList.remove("yang");
        cell.classList.add("dead");
        grid[row][col] = 0;
    }
}

// Функция для выполнения одного шага игры
function step() {
    const newGrid = [];

    for (let row = 0; row < numRows; row++) {
        newGrid[row] = [];
        for (let col = 0; col < numCols; col++) {
            const neighbors = countNeighbors(row, col);
            const currentState = grid[row][col];
            let nextState = currentState;

            if (currentState === 0) {
                if (neighbors === 3) {
                    nextState = 1;
                }
            } else {
                if (neighbors < 2 || neighbors > 4) {
                    nextState = 0;
                }
            }

            newGrid[row][col] = nextState;
        }
    }

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            grid[row][col] = newGrid[row][col];
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (newGrid[row][col] === 0) {
                cell.classList.remove("yin", "yang");
                cell.classList.add("dead");
            } else if (newGrid[row][col] === 1) {
                cell.classList.remove("dead", "yang");
                cell.classList.add("yin");
            } else {
                cell.classList.remove("dead", "yin");
                cell.classList.add("yang");
            }
        }
    }
}

// Функция для подсчета живых соседей у заданной ячейки
function countNeighbors(row, col) {
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    let count = 0;

    neighbors.forEach(neighbor => {
        const newRow = row + neighbor[0];
        const newCol = col + neighbor[1];
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            if (grid[newRow][newCol] !== 0) {
                count++;
            }
        }
    });

    return count;
}

function populateGrid() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const randomState = Math.floor(Math.random() * 3); // 0, 1 или 2
            grid[row][col] = randomState;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);

            if (randomState === 0) {
                cell.classList.remove("yin", "yang");
                cell.classList.add("dead");
            } else if (randomState === 1) {
                cell.classList.remove("dead", "yang");
                cell.classList.add("yin");
            } else {
                cell.classList.remove("dead", "yin");
                cell.classList.add("yang");
            }
        }
    }
}

// Обработчик кнопки "Очистить"
document.querySelector("#clear-button").addEventListener("click", () => {
    clearGrid();
});

// Функция для очистки сетки
function clearGrid() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            cell.classList.remove("yin", "yang");
            cell.classList.add("dead");
            grid[row][col] = 0;
        }
    }
}


// Обработчик кнопки "Заполнить"
document.querySelector("#populate-button").addEventListener("click", () => {
    populateGrid();
});

// Обработчик кнопки "Старт"
document.querySelector("#start-button").addEventListener("click", () => {
    startGame();
});

// Обработчик кнопки "Стоп"
document.querySelector("#stop-button").addEventListener("click", () => {
    stopGame();
});

let intervalId = null;

function startGame() {
    if (!intervalId) {
        intervalId = setInterval(step, delay);
    }
}

function stopGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Создаем начальную сетку
createGrid();
