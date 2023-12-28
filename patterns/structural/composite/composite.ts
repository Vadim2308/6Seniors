/**
 * Хорошо подходит для работы с древовидной структурой данных
 * Позволяет с помощью одного методы агрегировать вызовы многих методов
 */

abstract class DeliveryItem {
	items: DeliveryItem[] = []
	addItem(item:DeliveryItem){
		this.items.push(item)
	}
	getItemPrices():number{
		return this.items.reduce((acc:number,item:DeliveryItem)=>acc + item.getPrice(),0)
	}
	abstract getPrice():number
}

export class DeliveryShop extends DeliveryItem{
	constructor(private deliveryFee:number) { // deliveryFee - стоимость доставки
		super();
	}
	getPrice(): number {
		return this.getItemPrices() + this.deliveryFee
	}
}

export class Package extends DeliveryItem {
	getPrice(): number {
		return this.getItemPrices()
	}
}

class Product extends DeliveryItem {
	constructor(private price:number) {
		super()
	}

	getPrice(): number {
		return this.price
	}
}

// Паттерн composite
const shop = new DeliveryShop(100)
shop.addItem(new Product(1_000))

const pack1 = new Package()
pack1.addItem(new Product(200))
pack1.addItem(new Product(300))
shop.addItem(pack1)

const pack2 = new Package()
pack2.addItem(new Product(30))
shop.addItem(pack2)

console.log(shop.getPrice()) // ЧТоб узнать стоимость всех товаров, надо просто вызвать метод getPrice()