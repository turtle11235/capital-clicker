export default class EmployeeManager {
  employees: any[];
  click: () => void;
  pay: (amount: number) => void;

  minWage = 7.5;
  wage = 7.5;
  numWorkers = 0;
  numManagers = 0;

  canHire = false;
  canFire = false;

  businessUnlocked = false;
  managersUnlocked = false;
  middleManagersUnlocked = false;

  constructor(click: () => void, pay: (amount: number) => void) {
    this.employees = [];
    this.click = click;
    this.pay = pay;
  }

  execute = () => {};

  hire = () => {};

  fire = () => {};

  getNumWorkers() {
    return this.numWorkers;
  }

  getNumManagers() {
    return this.numManagers;
  }

  unlockBusiness() {
    this.businessUnlocked = true;
  }

  unlockManagers() {
    this.managersUnlocked = true;
  }

  unlockMiddleManagers() {
    this.middleManagersUnlocked = true;
  }
}
