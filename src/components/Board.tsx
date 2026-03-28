import { BoardGrid } from '../types'
import './Board.css'

interface BoardProps {
  board: BoardGrid
  clearingRows: number[]
}

export function Board({ board, clearingRows }: BoardProps) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`board-row ${clearingRows.includes(rowIndex) ? 'board-row--clearing' : ''}`}
        >
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell === 0 ? 'cell-empty' : `cell-color-${cell}`}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
