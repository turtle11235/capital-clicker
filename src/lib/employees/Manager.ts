import Employee from "./Employee"

export default abstract class Manager extends Employee {
  work = () => {
    for (var employee of this.employees) {
      employee.work()
    }
  }
}
