import fs from 'fs/promises'
import { resolve } from 'path'

const priority = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

type Rucksack = {
  firstCompartment: string
  secondCompartment: string
  inCommonLetter: string
  valuePriority: number
}

async function main() {
  const inputData = (await fs.readFile(resolve(__dirname, 'input.txt'))).toString()

  const inputDataSplited = inputData.split('\n')
  const rucksackData: Rucksack[] = []

  for(const rucksack of inputDataSplited) {
    const firstCompartment: string[] = []
    const secondCompartment: string[] = []
    let inCommonLetter = 'b' 
    const wordSize = rucksack.split('').length

    rucksack.split('').map((letter, index) => {
      if (index < wordSize / 2) {
        firstCompartment.push(letter)
      } else {
        secondCompartment.push(letter)
      }
    })

    for(const firstCompartmentLetter of firstCompartment) {
      for (const secondCompartmentLetter of secondCompartment) {
        if (firstCompartmentLetter === secondCompartmentLetter) {
          inCommonLetter = firstCompartmentLetter
        }
      }
    } 

    const valuePriority = priority.indexOf(inCommonLetter) + 1

    rucksackData.push({
      firstCompartment: firstCompartment.join(),
      secondCompartment: secondCompartment.join(),
      inCommonLetter,
      valuePriority
    })
  }

  const result = rucksackData.reduce((acc, curr) => acc += curr.valuePriority, 0)

  console.log(result)
}

main().then()