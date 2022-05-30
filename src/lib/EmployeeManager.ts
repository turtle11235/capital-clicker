

export default class EmployeeManager {
    employees: any[]
    click: ()=>void
    pay: (amount: number)=>void

    minWage = 7.5
    wage = 7.5
    numWorkers = 0
    numManagers = 0

    constructor(click: ()=>void, pay: (amount: number)=>void){
        this.employees = []
        this.click = click
        this.pay = pay
    }

    execute = ()=>{

    }

    hire = ()=>{

    }

    fire = ()=>{

    }

    get canHire(){
        return false
    }
}