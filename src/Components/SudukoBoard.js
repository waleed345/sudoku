import React, { useEffect, useState } from 'react'
import { solve } from '../Helper/SudokuGame';

function SudukoBoard(puzzleData) {
    const [board, setBoard] = useState([])
    const boardRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    const boardCol = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        puzzleData.puzzle && generateBoard()
    }, [puzzleData])

    const generateBoard = () => {
        let puzzle = puzzleData?.puzzle
        let board = []

        boardRow.forEach((boardRow, boardRowIndex) => {
            board.push([])
            boardCol.forEach(boardCol => {
                if (puzzle && puzzle[boardRow + boardCol]) {
                    board[boardRowIndex].push(parseInt(puzzle[boardRow + boardCol]))
                } else {
                    board[boardRowIndex].push(null)
                }
            })
        })

        setBoard(board)
    }

    const onChangeHandler = (e, row, col) => {
        let value = e.target.value
        let _board = [...board]
        if (value == "" || value >= 1 && value <= 9) {
            _board[row][col] = value
            setBoard(_board)
        }
    }

    const solveSudoku = () => {
        let isSolved = solve(board)
        setBoard(solve(board))
        isSolved ? puzzleData.checkIsSolved(true) : puzzleData.checkIsSolved(false)
    }

    return (
        <div className='board'>
            <table border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                    {board.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex} className={(rowIndex + 1) % 3 === 0 ? "bottomBorder" : ""}>
                                {row.map((col, colIndex) => {
                                    let row = boardRow[rowIndex] + (parseInt(colIndex) + 1)
                                    let isDisable = puzzleData?.puzzle[row]
                                    return (
                                        <td key={rowIndex + colIndex} className={(colIndex + 1) % 3 === 0 ? "rightBorder" : ""}>
                                            <input
                                                onChange={e => onChangeHandler(e, rowIndex, colIndex)}
                                                value={col || ""}
                                                disabled={isDisable}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={() => solveSudoku()} className="btn btn-full">Solve</button>
        </div >
    )
}

export default SudukoBoard