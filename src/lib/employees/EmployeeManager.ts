import {
  HIRING_BONUS,
  MANAGERS_PER_MANAGER,
  WORKERS_PER_MANAGER,
  WORKER_SECONDS_PER_PAYDAY,
} from '../constants'
import Game from '../Game'
import { ticksToSeconds } from '../utils'
import Employee from './Employee'
import EmployeeFactory from './EmployeeFactory'

/*
TODO:
  -Scale hiring costs based on worker click upgrades
  -Upgrades: hire individual workers and managers -> hire worker and all managers -> hire manager and all workers
  -Upgrades: choose payday frequency (btw 1 day and 2 weeks)
  -Give Employees names and titles
*/

export default class EmployeeManager {
  game: Game
  root: Employee

  minWage = 7.5
  wage = 7.5

  prevPayTime = 0

  businessUnlocked = false
  managersUnlocked = false
  middleManagersUnlocked = false

  constructor(game: Game) {
    this.game = game
    this.root = EmployeeFactory.createEmployee({
      level: 1,
      moneyCallback: () => game.money,
      baseWageCallback: () => this.minWage,
      spendCallBack: this.spend,
      workCallback: () => {
        this.game.workerClick()
      },
      counterCallback: () => game.counter,
      boss: null,
      employees: [],
    })
  }

  execute = () => {
    this.root.work()
    if (this.payPeriodHasElapsed()) {
      for (const employee of this.root.employees) {
        employee.pay()
      }
      console.log('PAYDAY', this.root)
    }
  }

  payPeriodHasElapsed = () => {
    if (ticksToSeconds(this.game.counter) % WORKER_SECONDS_PER_PAYDAY === 0) {
      return true
    }
    else {
      return false
    }
  }

  hire = () => {
    if (this.canHire) {
      if (this.root.isFull && !this.root.canHire) {
        const oldRoot = this.root
        const props = {
          ...this.root.props,
          ...{ level: this.root.level + 1, employees: [this.root] },
        }
        this.root = EmployeeFactory.createEmployee(props)
        oldRoot.boss = this.root
        this.spend(oldRoot, oldRoot.wage * HIRING_BONUS)
      }

      if (this.root.canHire) {
        this.root.hire()
      }
      else {
        console.log('Failed to hire new employee')
      }

      console.log(this.root)
    }
  }

  fire = () => {
    this.root.fire()
    console.log(this.root)
  }

  spend = (employee: Employee, amount: number) => {
    if (this.root !== employee) {
      this.game.spendMoney(amount)
    }
  }

  unlockBusiness() {
    this.businessUnlocked = true
  }

  unlockManagers() {
    this.managersUnlocked = true
  }

  unlockMiddleManagers() {
    this.middleManagersUnlocked = true
  }

  get numWorkers() {
    return this.root.numWorkers
  }

  get numManagers() {
    return this.root.numManagers - 1
  }

  get hireOneCost() {
    /*
      if the root is full, the cost will include the cost of hiring 2 managers
      at the level of the root (including hiring bonus)
    */
    const cost = this.root.hireOneCost
    if (this.root.isFull && !this.root.canHire) {
      return cost + this.root.wage * HIRING_BONUS * 2
    }
    else {
      return cost
    }
  }

  get hireAllCost() {
    /*
      if the root is full, the cost will include the cost of hiring a manager
      at the level of the root and all of its sub-managers (minus the one that
      already exists)
    */
    const cost = this.root.hireAllCost
    if (this.root.isFull) {
      const newBossCost = this.root.wage * HIRING_BONUS
      const subManagersCost
        = this.root.employees[0].wage * (MANAGERS_PER_MANAGER - 1) * HIRING_BONUS
      return cost + newBossCost + subManagersCost
    }
    else {
      return cost
    }
  }

  get canHire() {

    if (this.root.canHire) {
      return true
    }
    else if (this.game.money >= this.hireOneCost) {
      return (
        this.middleManagersUnlocked
        || (this.managersUnlocked && this.numManagers < MANAGERS_PER_MANAGER)
        || (this.businessUnlocked && this.numWorkers < WORKERS_PER_MANAGER)
      )
    }
    else {
      return false
    }
  }

  get canFire() {
    return this.root.canFire
  }
}
