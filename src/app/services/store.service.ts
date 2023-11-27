import {Injectable} from '@angular/core';
import {Product} from "../models/prduct.model";
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  myShopingCart: Product[] = []

  private myCart = new BehaviorSubject<Product[]>([])

  myCart$ = this.myCart.asObservable()

  constructor() {
  }


  getShopingCar() {
    return this.myShopingCart
  }

  onAddToShopingCart(product: Product) {
    this.myShopingCart.push(product)
    this.myCart.next(this.myShopingCart)
  }

  getTotal() {
    return this.myShopingCart.reduce((sum, i) => sum + i.price, 0)
  }
}
