import App from '../App';
import { IRL_TO_INGAME_TIME_MULTIPLIER, TICKS_PER_SECOND } from './constants';
import EmployeeManager from './employees/EmployeeManager';
import MoneyManager from './money/MoneyManager';
import UpgradeManager from './upgrades/UpgradeManager';
import { displayElapsedTime, ticksToSeconds } from './utils';

export default class Game {
  app: App;

  counter = 0;
  counterID = 0;

  businessUnlocked = false;

  private moneyManager = new MoneyManager();
  private employeeManager = new EmployeeManager(
    this.moneyManager.workerClick,
    this.moneyManager.spendMoney
  );
  private upgradeManager = new UpgradeManager(this);

  running = false;

  constructor(app: App, running = false) {
    this.app = app;
    this.running = running;
  }

  startGame = () => {
    if (!this.running) {
      this.run();
      this.running = true;
      this.startGame = () => {};
    }
  };

  run = () => {
    this.counterID = setInterval(
      () => {
        this.gameLoop();
        this.counter++;
      },
      (1000 * 1) / TICKS_PER_SECOND,
      null,
      null
    );
  };

  gameLoop = () => {
    // this.employeeManager.execute()
    this.updateApp();
  };

  updateApp = () => {
    this.app.update({
      money: this.moneyManager.money,
      upgrades: this.upgradeManager.upgrades,
      minWage: this.employeeManager.minWage,
      wage: this.employeeManager.wage,
      numWorkers: this.employeeManager.numWorkers,
      numManagers: this.employeeManager.numManagers,
      canHire: this.employeeManager.canHire,
      canFire: this.employeeManager.canFire,
      elapsedTime: this.elapsedTime,
      time: this.time,
      day: this.day,
    });
  };

  userClick = () => {
    this.moneyManager.userClick();
    this.startGame();
  };

  workerClick = () => {
    this.moneyManager.workerClick();
  };

  setUserClickVal(amount: number) {
    this.moneyManager.userClickVal = amount;
  }

  setWorkerClickVal(amount: number) {
    this.moneyManager.workerClickVal = amount;
  }

  spendMoney = (amount: number) => {
    this.moneyManager.spendMoney(amount);
  };

  receiveMoney = (amount: number) => {
    this.moneyManager.receiveMoney(amount);
  };

  unlockBusiness = () => {
    this.businessUnlocked = true;
  };

  unlockManagers = () => {
    this.employeeManager.managersUnlocked = true;
  };

  unlockMiddleManagers = () => {
    this.employeeManager.middleManagersUnlocked = true;
  };

  hireWorker = () => {
    this.employeeManager.hire();
  };

  fireWorker = () => {
    this.employeeManager.fire();
  };

  get money() {
    return this.moneyManager.getMoney();
  }

  get totalMoney() {
    return this.moneyManager.getTotalMoney();
  }

  get numWorkers() {
    return this.employeeManager.numWorkers;
  }

  get numManagers() {
    return this.employeeManager.numManagers;
  }

  get canHire() {
    return this.employeeManager.canHire;
  }

  get canFire() {
    return this.employeeManager.canFire;
  }

  get upgradesUnlocked() {
    return this.upgradeManager.upgradesEnabled;
  }

  get elapsedTime() {
    return displayElapsedTime(ticksToSeconds(this.counter));
  }

  get time() {
    var seconds =
      (ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER) %
      (60 * 60 * 24);
    return displayElapsedTime(seconds);
  }

  get day() {
    return Math.floor(
      (ticksToSeconds(this.counter) * IRL_TO_INGAME_TIME_MULTIPLIER) /
        60 /
        60 /
        24
    );
  }
}
