import { FIRING_MULTIPLIER } from "../constants"
import Employee from "./Employee"

export default abstract class Manager extends Employee {
  work = () => {
    for (const employee of this.employees) {
      employee.work()
    }
  }

  fire = (employee?: Employee) => {
    if (employee) {
      console.log(`Firing ${employee.title} (Level ${employee.level}).`)
      this.spendMoney(employee, employee.totalWages * FIRING_MULTIPLIER)
      return this.employees.splice(this.employees.indexOf(employee), 1)[0]
    }

    for (let i = this.employees.length - 1; i >= 0; i--) {
      if (this.employees[i].canFire) {
        return this.employees[i].fire()
      }
    }
    throw new Error("Unable to fire, employees is empty")
  }

  get canFire(): boolean {
    return this.employees.some((employee) => employee.canFire)
  }

}
