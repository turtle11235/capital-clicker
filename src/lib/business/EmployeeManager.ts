import { HIRING_BONUS, MANAGERS_PER_MANAGER, TRAINING_OVERHEAD, WORKER_SECONDS_PER_PAYDAY } from "../constants"
import Executable from "../Executable"
import Game from "../Game"
import { ticksToSeconds } from "../utils"
import Employee from "./employee/Employee"
import EmployeeFactory from "./EmployeeFactory"
import HiringManager from "./HiringManager"

export default class EmployeeManager implements Executable {
  game: Game
  root: Employee
  hiringManager: HiringManager

  minWage = 10
  wage = 10

  prevPayTime = 0
  maxManagerLevel = 1

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
      hireMultiplierCallback: () => {
        return HIRING_BONUS * Math.pow(TRAINING_OVERHEAD, this.root ? this.root.level - 1 : 0)
      },
      boss: null,
      employees: [],
    })
    this.hiringManager = new HiringManager(game, this.root)
  }

  execute = () => {
    this.root.work()
    if (this.payPeriodHasElapsed()) {
      for (const employee of this.root.employees) {
        employee.pay()
      }
      console.log("PAYDAY")
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

  /**
   * Hires a new employee and any additional managers needed.
   */
  hire = () => {
    // Hire new manager if necessary
    // if (this.root.isFullAllLevels) {
    //   const oldRoot = this.root
    //   const props = {
    //     ...this.root.props,
    //     ...{ level: this.root.level + 1, employees: [this.root] },
    //   }
    //   this.root = EmployeeFactory.createEmployee(props)
    //   oldRoot.boss = this.root
    //   this.spend(oldRoot, oldRoot.hireThisCost)
    // }

    // // Hire new worker and lower manager
    // if (this.canHire) {
    //   this.root.hire()
    //   console.log("[EmployeeManager.hire] Employee tree updated. Current root:", this.root)
    // }
    // else {
    //   console.log("Failed to hire new employee. Not enough money or not enough space.")
    // }
    console.log("here")
    this.hiringManager.hireManager()
  }

  fire = () => {
    this.root.fire()
  }

  spend = (employee: Employee, amount: number) => {
    if (this.root && this.root !== employee) {
      this.game.spendMoney(amount)
    }
  }

  unlockBusiness() {
    this.businessUnlocked = true
  }

  upgradeManagers() {
    this.maxManagerLevel++
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

  /**
   * Determines the cost of hiring another worker. This includes:
   * (a) The base cost of hiring a new worker
   * (b) The cost of hiring any additional managers
   * (c) Any required hiring bonuses
   *
   * @remarks
   * If any additional managers need to be hired, the count will always be two.
   *
   * @returns The total cost of hiring another worker
   */
  get hireOneCost() {
    const cost = this.root.hireOneWorkerCost
    if (this.root.isFullAllLevels) {
      // console.log("Entire tree is full, two managers will have to be hired to allow more workers.")
      return (cost + this.root.wage * HIRING_BONUS * 2) * TRAINING_OVERHEAD
    }
    else {
      // console.log("A new worker can be hired without hiring more managers.")
      return cost
    }
  }

  get hireAllCost() {
    /*
      if the root is full, the cost will include the cost of hiring a manager
      at the level of the root and all of its sub-managers (minus the one that
      already exists)
    */
    const cost = this.root.hireAllWorkersCost
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

  /**
   * Determines if a new worker can be hired. This is possible if the following requirements are met:
   * (1) There is enough money to hire the worker and any managers needed to support them.
   * (2) The level of any new managers needed does not exceed the max manager level.
   *
   * @returns `true` if a new worker can be hired, otherwise returns `false`
   */
  get canHire() {
    if (this.root.isFullAllLevels) {
      return this.game.money >= this.hireOneCost && this.root.level < this.maxManagerLevel
    }
    else {
      return this.game.money >= this.hireOneCost
    }
  }

  get canFire() {
    return this.root.canFire
  }
}
