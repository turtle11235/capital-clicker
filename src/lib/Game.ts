import App from "../App";
import { IRL_TO_INGAME_TIME_MULTIPLIER, TICKS_PER_SECOND } from "./constants";
import EmployeeManager from "./EmployeeManager";
import MoneyManager from "./MoneyManager";
import UpgradeManager from "./UpgradeManager";
import { displayElapsedTime, ticksToSeconds } from "./utils";

export default class Game {
    app: App

    counter = 0
    counterID = 0
    moneyManager = new MoneyManager()
    employeeManager = new EmployeeManager(this.moneyManager.workerClick, this.moneyManager.spendMoney)
    upgradeManager = new UpgradeManager(this)
    running = false

    constructor(app: App, running=false){
        this.app = app
        this.running = running
    }

    startGame = ()=>{
        if (!this.running) {
            this.run()
            this.running = true
            this.startGame = ()=>{}
        }
    }

    run = ()=>{
        this.counterID = setInterval(()=>{
            this.gameLoop()
            this.counter++
        }, 1000 * 1/TICKS_PER_SECOND, null, null)
    }

    gameLoop = ()=>{
        // this.employeeManager.execute()
        this.updateApp()
    }

    updateApp = ()=>{
        this.app.update({
            money: this.moneyManager.money,
            upgrades: this.upgradeManager.upgrades,
            minWage: this.employeeManager.minWage,
            wage: this.employeeManager.wage,
            numWorkers: this.employeeManager.numWorkers,
            numManagers: this.employeeManager.numManagers,
            canHire: this.employeeManager.canHire,
            elapsedTime: this.elapsedTime,
            time: this.time,
            day: this.day
          })
    }

    clickButton = ()=>{
        this.moneyManager.userClick()
        this.startGame()
    }

    get elapsedTime(){
        return displayElapsedTime(ticksToSeconds(this.counter))
    }

    get time(){
        var seconds = (ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER) % (60 * 60 * 24)
        return displayElapsedTime(seconds)
    }

    get day(){
        return Math.floor(ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER / 60 / 60 / 24)
    }
}