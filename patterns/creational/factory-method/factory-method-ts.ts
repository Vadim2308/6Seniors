/**
 * Реализовываем factory + abstract-factory
 *
 * Интерфейс общей страховки например авто. Она абстрактная, и не привязана ни к какой компании.
 * Любая страховка, которую мы добавим в нашу систему, должна реализовывать этот интерфейс.
 */
interface IInsurance {
    id:number;
    status:string;
    setVehicle(vehicle:any):void;
    submit():Promise<any>
}
class RosgostrahInsurance implements IInsurance  {
    id: number
    status: string
    private vehicle:any;
    setVehicle(vehicle: any): void {
       this.vehicle = vehicle
   }
   // @ts-ignore
    async submit():Promise<any>  {
      const res = await fetch('tf', // Тут уже конкретные Endpoins, характерные для конкретной Страховой компании
          {
              method:"POST",
              body:JSON.stringify({ vehicle:this.vehicle })
          })
      const data = await res.json()
       return data.isSuccess
   }
}

class TinkoffInsurance implements IInsurance  {
    id: number
    status: string
    private vehicle:any;
    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    // @ts-ignore
    async submit():Promise<any>  {
        const res = await fetch('ab', // Тут уже конкретные Endpoins, характерные для конкретной Страховой компании
            {
                method:"POST",
                body:JSON.stringify({ vehicle:this.vehicle })
            })
        const data = await res.json()
        return data.okey
    }
}

/**
 * Непосредственно сама абстрактная фабрика
 * Напрямую TFInsurance и ABInsurance не используем. Только через абстракции.
 * У нее есть полезные методы, которые будут полезны ВСЕМ фабрикам, с которыми будем работать.
 */
abstract class InsuranceFactory {
    db:any
    abstract createInsurance():IInsurance
    saveHistory(ins:IInsurance){
        this.db.save(ins.id,ins.status)
    }
    setToLocalStorageData(data:Record<string, any>){
        // Имплементация
        localStorage.setItem("",'')
    }
}

/**
 * Конкретные фабрики
 * Сюда можно уже иплементить методы, которые будут характерны дня КОНКРЕТНОЙ фабрики
 */
class RosgostrahInsuranceFactory extends InsuranceFactory {
    createInsurance(): RosgostrahInsurance {
        return new RosgostrahInsurance()
    }
    reloadTFServer():boolean{
        return true
    }
}
class TinkoffInsuranceFactory extends InsuranceFactory {
    createInsurance(): TinkoffInsurance {
        return new TinkoffInsurance()
    }
}
const tfInsuranceFactory = new RosgostrahInsuranceFactory()
const ins = tfInsuranceFactory.createInsurance()
tfInsuranceFactory.reloadTFServer()
tfInsuranceFactory.saveHistory(ins)


/**
 * Альтернативный подход
 * Не требует создания дополнительных фабрик
 */
const INSURANCE_TYPE = {
    tf:RosgostrahInsurance,
    ab:TinkoffInsurance
}

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlternative {
    db:any
    createInsurance<T extends keyof IT>(type:T):IT[T]{
        return INSURANCE_TYPE[type]
    }
    saveHistory(ins:IInsurance){
        this.db.save(ins.id,ins.status)
    }
}

const insuranceFactoryAlt = new InsuranceFactoryAlternative()
const ins2 = new (insuranceFactoryAlt.createInsurance('tf'))
insuranceFactoryAlt.saveHistory(ins2)