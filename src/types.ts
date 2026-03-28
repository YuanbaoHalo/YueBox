// 格子的值：0 = 空，1-5 = 不同颜色的方块
export type CellValue = number

// 棋盘：20行 x 10列的二维数组
export type BoardGrid = CellValue[][]

// 方块形状：小二维数组，1 = 有格子，0 = 空
export type Shape = number[][]

// 当前方块：形状 + 在棋盘上的左上角位置 + 颜色编号
export interface Piece {
  shape: Shape
  position: { row: number; col: number }
  colorId: number  // 1-5，对应5种主题色
}
