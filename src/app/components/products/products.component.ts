import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/prduct.model";
import {StoreService} from "../../services/store.service";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShopingCart: Product[] = []

  total = 0
  products: Product[] = []
  today = new Date()
  date = new Date(2022, 2 ,21)

  constructor(
    private store: StoreService,
    private productService: ProductsService,
  ) {
    this.myShopingCart = this.store.getShopingCar()
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe((data: Product[]) => {
        console.log(data)
        this.products = data
      })
  }

  onAddToShopingCart(product: Product) {
    // this.myShopingCart.push(product)
    // this.total = this.myShopingCart.reduce((sum, i) => sum + i.price, 0)

    this.store.onAddToShopingCart(product)
    this.total = this.store.getTotal()

  }


}
