export function solve(board) {
    if (solved(board)) return board
    const possibilities = nextBoards(board)
    const validBoards = keepOnlyValid(possibilities)
    return searchForSolutions(validBoards)
}

function searchForSolutions(boards) {
    if (boards.length < 1) return false

    let first = boards.shift()
    const tryPath = solve(first)
    if (!tryPath) {
        return searchForSolutions(boards)
    }
    return tryPath
}

function solved(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === null) {
                return false
            }
        }
    }
    return true
}

function nextBoards(board) {
    let res = []
    const firstEmpty = findEmptySquare(board)
    if (firstEmpty != undefined) {
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (let i = 1; i <= 9; i++) {
            let newBoard = [...board]
            let row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

function findEmptySquare(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

function keepOnlyValid(boards) {
    return boards.filter(b => validBoards(b))
}

function validBoards(board) {
    return rowGood(board) && colGood(board) && boxesGood(board)
}

function rowGood(board) {
    for (let i = 0; i < 9; i++) {
        let curr = []
        for (let j = 0; j < 9; j++) {
            if (curr.includes(board[i][j])) {
                return false
            } else if (board[i][j] != null) {
                curr.push(board[i][j])
            }
        }
    }
    return true
}

function colGood(board) {
    for (let i = 0; i < 9; i++) {
        let curr = []
        for (let j = 0; j < 9; j++) {
            if (curr.includes(board[j][i])) {
                return false
            } else if (board[j][i] != null) {
                curr.push(board[j][i])
            }
        }
    }
    return true
}

function boxesGood(board) {
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ]

    for (let y = 0; y < 9; y += 3) {
        for (let x = 0; x < 9; x += 3) {
            let curr = []
            for (let i = 0; i < 9; i++) {
                let coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (curr.includes(board[coordinates[0]][coordinates[1]])) {
                    return false
                } else if (board[coordinates[0]][coordinates[1]] != null) {
                    curr.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }

    return true
}
