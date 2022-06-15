import App from "../App"
import { IRL_TO_INGAME_TIME_MULTIPLIER, TICKS_PER_SECOND } from "./constants"
import EmployeeManager from "./employees/EmployeeHandler"
import MarketingManager from "./marketing/MarketingManager"
import MoneyManager from "./money/MoneyManager"
import UpgradeManager from "./upgrades/UpgradeManager"
import { displayElapsedTime, ticksToSeconds } from "./utils"

export default class Game {
  app: App

  counter = 0
  counterID = 0

  private moneyManager = new MoneyManager()
  private employeeManager = new EmployeeManager(this)
  private upgradeManager = new UpgradeManager(this)
  private marketingManager = new MarketingManager(this)

  running = false

  constructor(app: App, running = false) {
    this.app = app
    this.running = running
  }

  startGame = () => {
    if (!this.running) {
      this.run()
      this.running = true
      this.startGame = () => { }
    }
  }

  run = () => {
    this.counterID = setInterval(
      () => {
        this.gameLoop()
        this.counter++
      },
      (1000 * 1) / TICKS_PER_SECOND,
      null,
      null
    )
  }

  gameLoop = () => {
    this.employeeManager.execute()
    this.marketingManager.execute()
    this.updateApp()
  }

  updateApp = () => {
    this.app.update({
      money: this.moneyManager.money,
      socialCapital: this.marketingManager.getSocialCapital(),
      marketingBudget: this.marketingManager.budget,
      maxMarketingBudget: this.marketingManager.maxBudget,
      upgrades: this.upgradeManager.upgrades,
      minWage: this.employeeManager.minWage,
      wage: this.employeeManager.wage,
      hireOneCost: this.employeeManager.hireOneCost,
      numWorkers: this.employeeManager.numWorkers,
      numManagers: this.employeeManager.numManagers,
      canHire: this.employeeManager.canHire,
      canFire: this.employeeManager.canFire,
      elapsedTime: this.elapsedTime,
      time: this.time,
      day: this.day,
    })
  }

  userClick = () => {
    this.moneyManager.userClick()
    this.startGame()
  }

  workerClick = (n?: number) => {
    this.moneyManager.workerClick(n)
  }

  setUserClickVal(amount: number) {
    this.moneyManager.userClickVal = amount
  }

  setWorkerClickVal(amount: number) {
    this.moneyManager.workerClickVal = amount
  }

  spendMoney = (amount: number) => {
    this.moneyManager.spendMoney(amount)
  }

  receiveMoney = (amount: number) => {
    this.moneyManager.receiveMoney(amount)
  }

  unlockBusiness = () => {
    this.employeeManager.unlockBusiness()
  }

  upgradeManagers = () => {
    this.employeeManager.upgradeManagers()
  }

  unlockManagers = () => {
    this.employeeManager.unlockManagers()
  }

  unlockMiddleManagers = () => {
    this.employeeManager.unlockMiddleManagers()
  }

  hireWorker = () => {
    this.employeeManager.hire()
  }

  fireWorker = () => {
    this.employeeManager.fire()
  }

  unlockMarketing = () => {
    this.marketingManager.marketingUnlocked = true
  }

  setMarketingBudget = (budget: number) => {
    this.marketingManager.setBudget(budget)
  }

  setMaxMarketingBudget = (budget: number) => {
    this.marketingManager.setMaxBudget(budget)
  }

  get totalMoney() {
    return this.moneyManager.totalMoney
  }

  get money() {
    return this.moneyManager.money
  }

  get businessUnlocked() {
    return this.employeeManager.businessUnlocked
  }

  get managersUnlocked() {
    return this.employeeManager.managersUnlocked
  }

  get middleManagersUnlocked() {
    return this.employeeManager.middleManagersUnlocked
  }

  get maxManagerLevel() {
    return this.employeeManager.maxManagerLevel
  }

  get numWorkers() {
    return this.employeeManager.numWorkers
  }

  get numManagers() {
    return this.employeeManager.numManagers
  }

  get canHire() {
    return this.employeeManager.canHire
  }

  get canFire() {
    return this.employeeManager.canFire
  }

  get upgradesUnlocked() {
    if (this.totalMoney > 0.74) {
      return true
    }
    else {
      return false
    }
  }

  get marketingUnlocked() {
    return this.marketingManager.marketingUnlocked
  }

  get elapsedTime() {
    return displayElapsedTime(ticksToSeconds(this.counter))
  }

  get time() {
    const seconds = (ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER) % (60 * 60 * 24)
    return displayElapsedTime(seconds)
  }

  get day() {
    return Math.floor(
      (ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER) / 60 / 60 / 24
    )
  }
}
