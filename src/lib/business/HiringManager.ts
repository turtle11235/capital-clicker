import Game from "../Game"
import Employee from "./employee/Employee"
import EmployeeFactory from "./EmployeeFactory"


export default class HiringManager {
  hiringDelayMean: number
  hiringDelaySTD: number
  hiringBonus: number
  firingBonus: number
  hiringQueue = []
  root: Employee
  game: Game

  constructor(game: Game, root: Employee, mean = 5, std = 1, hireBonus = 2, fireBonus = 2) {
    this.game = game
    this.root = root
    this.hiringDelayMean = mean
    this.hiringDelaySTD = std
    this.hiringBonus = hireBonus
    this.firingBonus = fireBonus
  }

  hireNextEmployee = () => {
    if (this.root.isFullAllLevels) {
      const oldRoot = this.root
      const props = {
        ...this.root.props,
        ...{ level: this.root.level + 1, employees: [this.root] },
      }
      this.root = EmployeeFactory.createEmployee(props)
      oldRoot.boss = this.root
      return oldRoot
    }
    else {
      let currNode = this.root
      while (currNode.level > 0) {
        for (const employee of currNode.employees) {
          if (employee.canHire) {
            console.log("Employee can hire")
            currNode = employee
            break
          }
        }
        if (!currNode.isFull) {
          const employeeProps = {
            ...currNode.props,
            ...{ level: currNode.level - 1, boss: currNode, employees: [] },
          }
          const newHire = EmployeeFactory.createEmployee(employeeProps)
          currNode.employees.push(newHire)
          return newHire
        }
        else {
          console.log("An error has ocurred somewhere...")
          break
        }
      }
      if (currNode.level === 0) {
        console.log("Failed to recurse properly, reached the workers")
      }
    }

    console.log("Updated company hierarchy:", this.root)
  }

  hireWorker = () => {
    return this.hireDownToLevel(0)
  }

  hireManager = (level = 1) => {
    return this.hireDownFromLevel(level)
  }

  hireDownToLevel = (level: number) => {
    const topNode = this.hireNextEmployee()!
    if (topNode.level === level) {
      return topNode
    }

    let currNode = topNode
    while (currNode.level > level) {
      const employeeProps = {
        ...currNode.props,
        ...{ level: currNode.level - 1, boss: currNode, employees: [] },
      }
      const newHire = EmployeeFactory.createEmployee(employeeProps)
      currNode.employees.push(newHire)
      currNode = newHire
    }

    return currNode
  }

  hireDownFromLevel = (level: number) => {
    const topNode = this.hireDownToLevel(level)!
    const queue = [topNode]
    while (queue.length > 0) {
      const currNode = queue.shift()!
      for (let i = 0; i < currNode.maxEmployees - currNode.employees.length; i++) {
        const employeeProps = {
          ...currNode.props,
          ...{ level: currNode.level - 1, boss: currNode, employees: [] },
        }
        const newHire = EmployeeFactory.createEmployee(employeeProps)
        currNode.employees.push(newHire)
      }
      queue.push(...currNode.employees)
    }
  }
}