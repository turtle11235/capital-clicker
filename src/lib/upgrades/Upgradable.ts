type UpgradeInterface = {
    getTotalMoney: ()=>number
    getMoney: ()=>number
    getNumWorkers: ()=>number
    spendMoney: (amount: number)=>void
    receiveMoney: (amount: number)=>void
    unlockBusiness: ()=>void
    unlockManagers: ()=>void
    unlockMiddleManagers: ()=>void
    setUserClickVal: (amount: number)=>void
    setWorkerClickVal: (amount: number)=>void
}