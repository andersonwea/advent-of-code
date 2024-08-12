import fs from 'node:fs'
import { resolve } from 'node:path'

const opponent = {
  A: 1, // pedra
  B: 2, // papel
  C: 3  // tesoura
}

const me = {
  X: 1, // pedra
  Y: 2, // papel
  Z: 3  // tesoura
}

enum ScoreTable {
  lose = 0,
  draw = 3,
  win = 6
}

const result = {
  X: 'lose',
  Y: 'draw',
  Z: 'win'
}

type OpponentMoves = 'A' | 'B' | 'C'
type MyMoves = 'Y' | 'X' | 'Z'
type Result = 'win' | 'draw' | 'lose'

type MovesProps = {
  opponentMove: OpponentMoves
  myMove: MyMoves
}

function compareMoves({ myMove, opponentMove }: MovesProps): Result {
  const diff = opponent[opponentMove] - me[myMove]

  if (opponent[opponentMove] === me[myMove]) {
    return 'draw'
  }

  if (diff === 1 || diff === -2) {
    return 'lose'
  } 

  return 'win'
}


interface ChooseMovementProps {
  opponentMove: OpponentMoves
  expect: 'Y' | 'X' | 'Z'
}

type MyMovement = {
  move: string
  result: Result
  score: number
}

function chooseMovement({ opponentMove, expect }: ChooseMovementProps) {
  let myMovement: MyMovement = {
    move: '',
    result: 'draw',
    score: 0
  }
  const expectResult = result[expect]

  const options = Object.keys(me) as MyMoves[]

  for (const option of options) {
    const result = compareMoves({
      opponentMove,
      myMove: option
    })

    if (expectResult === result) {
      myMovement.move = option
      myMovement.result = result
      myMovement.score = me[option]
    }
  }

  return myMovement
}

function main() {
  const inputData = fs.readFileSync(resolve(__dirname, 'input.txt')).toString()

  const movements = inputData.split('\n').map((item) => item.split(' ')) as [OpponentMoves, MyMoves][]
  
  let myScore = 0
  let myScorePart2 = 0
  for (const movement of movements) {
    const result = compareMoves({
      opponentMove: movement[0],
      myMove: movement[1]
    })
    
    const result2 = chooseMovement({
      opponentMove: movement[0],
      expect: movement[1]
    })
    
    myScore += ScoreTable[result] + me[movement[1]]
    myScorePart2 += ScoreTable[result2.result] + result2.score
  }

  return {
    myScore,
    myScorePart2
  }
}

console.log(main())


