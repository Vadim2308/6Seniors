"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class RosgostrahInsurance {
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    // @ts-ignore
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('tf', // Тут уже конкретные Endpoins, характерные для конкретной Страховой компании
            {
                method: "POST",
                body: JSON.stringify({ vehicle: this.vehicle })
            });
            const data = yield res.json();
            return data.isSuccess;
        });
    }
}
class TinkoffInsurance {
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    // @ts-ignore
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch('ab', // Тут уже конкретные Endpoins, характерные для конкретной Страховой компании
            {
                method: "POST",
                body: JSON.stringify({ vehicle: this.vehicle })
            });
            const data = yield res.json();
            return data.okey;
        });
    }
}
/**
 * Непосредственно сама абстрактная фабрика
 * Напрямую TFInsurance и ABInsurance не используем. Только через абстракции.
 * У нее есть полезные методы, которые будут полезны ВСЕМ фабрикам, с которыми будем работать.
 */
class InsuranceFactory {
    saveHistory(ins) {
        this.db.save(ins.id, ins.status);
    }
    setToLocalStorageData(data) {
        // Имплементация
        localStorage.setItem("", '');
    }
}
/**
 * Конкретные фабрики
 * Сюда можно уже иплементить методы, которые будут характерны дня КОНКРЕТНОЙ фабрики
 */
class RosgostrahInsuranceFactory extends InsuranceFactory {
    createInsurance() {
        return new RosgostrahInsurance();
    }
    reloadTFServer() {
        return true;
    }
}
class TinkoffInsuranceFactory extends InsuranceFactory {
    createInsurance() {
        return new TinkoffInsurance();
    }
}
const tfInsuranceFactory = new RosgostrahInsuranceFactory();
const ins = tfInsuranceFactory.createInsurance();
tfInsuranceFactory.reloadTFServer();
tfInsuranceFactory.saveHistory(ins);
/**
 * Альтернативный подход
 * Не требует создания дополнительных фабрик
 */
const INSURANCE_TYPE = {
    tf: RosgostrahInsurance,
    ab: TinkoffInsurance
};
class InsuranceFactoryAlternative {
    createInsurance(type) {
        return INSURANCE_TYPE[type];
    }
    saveHistory(ins) {
        this.db.save(ins.id, ins.status);
    }
}
const insuranceFactoryAlt = new InsuranceFactoryAlternative();
const ins2 = new (insuranceFactoryAlt.createInsurance('tf'));
insuranceFactoryAlt.saveHistory(ins2);
