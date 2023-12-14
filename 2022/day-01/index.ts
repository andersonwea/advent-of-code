import fs from 'fs'
import { resolve } from 'path'

function calcEachElvesCalories(input: string): number[] {
  const elvesCaloriesSplited = input.split('\n\n').map((item) => item.split('\n'))

  const eachElvesTotalCalories: number[] = []
  for (const elveCalories of elvesCaloriesSplited) {
    const elveCaloriesTotal = elveCalories.reduce((acc, curr) => acc + Number(curr), 0)

    eachElvesTotalCalories.push(elveCaloriesTotal)
  }

  return eachElvesTotalCalories
}

function main() {
  const inputDataBuffer = fs.readFileSync(resolve(__dirname, 'input.txt'))
  const inputData = inputDataBuffer.toString()
  
  const eachElveCaloriesTotal = calcEachElvesCalories(inputData)

  const eachElvesTotalCaloriesSorted = eachElveCaloriesTotal.sort((a, b) => b - a)

  const mostElveColories = eachElvesTotalCaloriesSorted[0]
  const topThreeElveMostCaloriesTotal = eachElvesTotalCaloriesSorted
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr)

  return {
    mostElveColories,
    topThreeElveMostCaloriesTotal
  }
}

console.log(main())