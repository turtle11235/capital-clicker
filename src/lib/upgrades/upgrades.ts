import { MANAGERS_PER_MANAGER, MANAGER_SALARY_MULTIPLIER, WORKERS_PER_MANAGER } from "../constants"
import { formatNumber } from "../utils"
import MultiUpgrade from "./MultiUpgrade"
import Upgrade, { UpgradeProps } from "./Upgrade"
import UpgradeID from "./UpgradeID"

export class UpgradeModuleUpgrade extends Upgrade {
  id = UpgradeID.UPGRADE_MODULE
  pricetag = ""
  title = "Work Smarter Not Harder"
  description = "Begin research into improving the money-making machine"

  _trigger = () => {
    const canBuy = this.game.totalMoney >= 0.1
    if (canBuy) {
      this.game.unlockUpgrades()
    }
    return canBuy
  }

  execute = () => {}

  cost = () => {
    return true
  }

}

export class MoneyMachineUpgrades extends MultiUpgrade {
  id = UpgradeID.MONEY_MACHINE
  maxUses = 5

  values = {
    clickVal: [.05, .10, .25, .50, 1],
    price: [1, 4, 10, 25, 50],
    title: [
      "A Slight Improvement",
      "Improved Clicking Technique",
      "Larger Clicking Surface",
      "Lubricated Button",
      "Hardware Optimization",
    ]
  }

  constructor(props: UpgradeProps) {
    super(props)
    this.incrementVals()
    this.update()
  }

  _trigger = () => {
    return this.checkDependencies([UpgradeID.UPGRADE_MODULE]) && this.game.totalMoney >= this.nextVals.price
  }

  cost = () => {
    return this.game.money >= this.nextVals.price
  }

  execute = () => {
    this.game.spendMoney(this.nextVals.price as number)
    this.game.setUserClickVal(this.nextVals.clickVal as number)
  }

  update = () => {
    this.title = this.nextVals.title as string
    this.pricetag = `($${formatNumber(this.nextVals.price as number)})`
    this.description = `Money machine gives $${this.nextVals.clickVal} per click`
  }
}

export class BusinessModuleUpgrade extends Upgrade {
  id = UpgradeID.BUSINESS_MODULE
  title = "Local Business License"
  pricetag = "($10.00)"
  description = "Why click when you can pay someone to click for you?"

  _trigger = () => {
    return this.checkDependencies([UpgradeID.UPGRADE_MODULE]) && this.game.totalMoney >= 10
  }

  execute = () => {
    this.game.spendMoney(10)
    this.game.unlockBusiness()
  }

  cost = () => {
    return this.game.money >= 10
  }

}

export class WorkerMachineUpgrades extends MultiUpgrade {
  id = UpgradeID.WORKER_MACHINES
  maxUses = 5
  values = {
    price: [25, 50, 100, 150, 250],
    clickVal: [.05, .10, .25, .50, 1]
  }

  constructor(props: UpgradeProps) {
    super(props)
    this.incrementVals()
    this.update()
  }

  _trigger = () => {
    return this.game.userClickVal >= this.nextVals.clickVal && this.game.numWorkers > 0
  }

  execute = () => {
    this.game.spendMoney(this.nextVals.price as number)
    this.game.setWorkerClickVal(this.nextVals.clickVal as number)
  }

  cost = () => {
    return this.game.money >= this.nextVals.price
  }

  update = () => {
    this.title = `Company Rollout ${this.useCount > 0 ? this.useCount : ""}`
    this.pricetag = `($${formatNumber(this.nextVals.price as number)})`
    this.description = `Worker machines give $${formatNumber(this.nextVals.clickVal as number)} per click`
  }
}

export class LowerManagersUpgrade extends Upgrade {
  id = UpgradeID.LOWER_MANAGERS
  title = "Beginner Business Techniques"
  pricetag = "($100.00)"
  description = `Managers make ${MANAGER_SALARY_MULTIPLIER}x workers' wages and oversee up to ${WORKERS_PER_MANAGER} workers`

  _trigger = () => {
    return this.checkDependencies([UpgradeID.BUSINESS_MODULE]) && this.game.numWorkers >= WORKERS_PER_MANAGER && this.game.totalMoney >= 100
  }

  execute = () => {
    this.game.spendMoney(100)
    this.game.upgradeManagers()
  }

  cost = () => {
    return this.game.money >= 100
  }
}

export class MiddleManagerUpgrades extends MultiUpgrade {
  id = UpgradeID.MIDDLE_MANAGERS
  maxUses = 5

  constructor(props: UpgradeProps) {
    super(props)
    this.incrementVals()
    this.update()
  }

  get price() {
    return Math.pow(400, this.useCount + 1)
  }

  _trigger = () => {
    return this.checkDependencies([UpgradeID.LOWER_MANAGERS]) && this.game.totalMoney >= this.price
  }

  execute = () => {
    this.game.spendMoney(this.price)
    this.game.upgradeManagers()
  }

  cost = () => {
    return this.game.money >= this.price
  }

  update = () => {
    this.title = `Middle Management${this.useCount ? " " + this.useCount : ""}`
    this.pricetag = `($${formatNumber(this.price)})`
    this.description = `Middle-managers make ${MANAGER_SALARY_MULTIPLIER}x their subordinates' wages and oversee up to ${MANAGERS_PER_MANAGER} managers`
  }
}

export class FriendsFamilyUpgrade extends Upgrade {
  id = UpgradeID.FRIENDS_AND_FAM
  title = "Friends and Family Investment"
  pricetag = ""
  description = "Receive $200 - This counts as your birthday present too..."

  _trigger = () => {
    return this.checkDependencies([UpgradeID.BUSINESS_MODULE])
  }

  execute = () => {
    this.game.receiveMoney(200)
  }

  cost = () => {
    return true
  }

}

export class MarketingModuleUpgrade extends Upgrade {
  id = UpgradeID.MARKETING_MODULE
  title = "Marketing Division"
  pricetag = "($1000.00)"
  description = "Marketing generates social capital, which can facilitate social interactions"

  _trigger = () => {
    return this.game.maxManagerLevel >= 3
  }

  execute = () => {
    this.game.spendMoney(1000)
    this.game.unlockMarketing()
  }

  cost = () => {
    return this.game.money >= 1000
  }
}

export class MarketingBudgetUpgrades extends MultiUpgrade {
  id = UpgradeID.MARKETING_BUDGET
  maxUses = 5
  values = {
    titles: [
      "Telemarketing",
      "Social Media Campaign",
      "Targeted Ads",
      "Behavioural Tracking",
      "Creative Freedom"
    ],
    prices: [2000, 5000, 10000, 20000, 500000],
    budgets: [200, 500, 1000, 2000, 50000]
  }

  constructor(props: UpgradeProps) {
    super(props)
    this.incrementVals()
    this.update()
  }

  update = () => {
    this.title = this.nextVals.title as string
    this.pricetag = `($${formatNumber(this.nextVals.prices as number)})`
    this.description = `Marketing budget cap raised to $${formatNumber(this.nextVals.prices as number)} per day`
  }

  _trigger = () => {
    return this.game.maxManagerLevel >= 3 + this.useCount
  }

  execute = () => {
    this.game.spendMoney(this.nextVals.price as number)
    this.game.setMaxMarketingBudget(this.nextVals.budget as number)
  }

  cost = () => {
    return this.game.money >= this.nextVals.price
  }
}