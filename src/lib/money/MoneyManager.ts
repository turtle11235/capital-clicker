export default class MoneyManager {
  money: number
  totalMoney: number
  userClickVal: number
  workerClickVal: number
  readonly roundingError = 0.005

  constructor(
    money = 500,
    totalMoney = money,
    userClickVal = 0.01,
    workerClickVal = 0.01
  ) {
    this.money = money
    this.totalMoney = totalMoney
    this.userClickVal = userClickVal
    this.workerClickVal = workerClickVal
  }

  userClick() {
    this.money += this.userClickVal
    this.totalMoney += this.userClickVal
  }

  workerClick(n = 1) {
    this.money += this.workerClickVal * n
    this.totalMoney += this.workerClickVal * n
  }

  spendMoney(amount: number) {
    this.money -= amount
  }

  receiveMoney(amount: number) {
    this.money += amount
    this.totalMoney += amount
  }

  getMoney = () => {
    return Math.floor((this.money + this.roundingError) * 100) / 100
  }

  getTotalMoney = () => {
    return Math.floor((this.totalMoney + this.roundingError) * 100) / 100
  }

  setUserClickVal = (amount: number) => {
    this.userClickVal = Math.max(this.userClickVal, amount)
  }

  setWorkerClickVal = (amount: number) => {
    this.workerClickVal = Math.max(this.workerClickVal, amount)
  }
}
