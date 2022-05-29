
export default class MoneyManager {
    money: number
    totalMoney: number
    userClickVal: number
    workerClickVal: number

    constructor(money=0, totalMoney=0, userClickVal=.01, workerClickVal=.01){
        this.money = money
        this.totalMoney = totalMoney
        this.userClickVal = userClickVal
        this.workerClickVal = workerClickVal
    }
    
    userClick(){
        this.money += this.userClickVal
    }

    workerClick(n=1){
        this.money += this.workerClickVal * n
    }

    spendMoney(amount: number){
        this.money -= amount
    }

    receiveMoney(amount: number){
        this.money += amount
    }
}