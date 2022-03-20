import React, { useEffect, useState } from 'react'
import SudukoBoard from '../Components/SudukoBoard'

function Suduko() {
    const [puzzleData, setPuzzleData] = useState()
    const [isSolve, setIsSolve] = useState(false)

    useEffect(() => {
        (async function () {
            await fetchDiffucultyLevel()
        })()
    }, [])

    const fetchDiffucultyLevel = async (difficulty = 'easy') => {
        let levels = ['easy', 'medium', 'hard']
        let random = levels[Math.floor(Math.random() * levels.length)];
        if (difficulty === 'random') {
            difficulty = random
        } else if (difficulty === 'clear') {
            setPuzzleData({ difficulty: 'easy', puzzle: {} })
            return setIsSolve(false)
        }
        let data = await fetch(`https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`)
        let response = await data.json()
        setPuzzleData(response)
        setIsSolve(false)
    }

    return (
        <div className='sudoku-main'>
            <h1>Suduko Game</h1>
            <div className="top-header">
                <h3>Generate: </h3>
                <button onClick={() => fetchDiffucultyLevel('easy')} className='btn btn-transparent'>Easy</button>
                <button onClick={() => fetchDiffucultyLevel('medium')} className='btn btn-transparent'>Medium</button>
                <button onClick={() => fetchDiffucultyLevel('hard')} className='btn btn-transparent'>Hard</button>
                <button onClick={() => fetchDiffucultyLevel('random')} className='btn btn-transparent'>Random</button>
                <button onClick={() => fetchDiffucultyLevel('clear')} className='btn btn-solid'>Clear</button>
            </div>

            <SudukoBoard puzzle={puzzleData?.puzzle} checkIsSolved={setIsSolve} />

            <div className="bottom-menu">
                <div className="row">
                    <div className="row bordered-row">
                        <div className="col-6 bordered-col">
                            <span>&#10003; Validate</span>
                        </div>
                        <div className="col-6">
                            <span>{isSolve ? "solved" : "unsolved"}</span>
                        </div>
                    </div>

                    <div className="row bordered-row">
                        <div className="col-6 bordered-col">
                            <span>{puzzleData?.difficulty}</span>
                        </div>
                        <div className="col-6">
                            <span>&#9874; Difficulty </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suduko