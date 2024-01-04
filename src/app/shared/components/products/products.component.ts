import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CreateProductDTO, Product} from "../../../models/prduct.model";
import {StoreService} from "../../../services/store.service";
import {ProductsService} from "../../../services/products.service";
import {switchMap} from "rxjs/operators";
import {zip} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShopingCart: Product[] = []

  total = 0
  @Input() products: Product[] = []

  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id)
    }
  }

  showProductDetail = false
  productChose: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  }
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'

  // today = new Date()
  // date = new Date(2022, 2 ,21)

  @Output() loadMore = new EventEmitter()

  constructor(
    private store: StoreService,
    private productService: ProductsService,
  ) {
    this.myShopingCart = this.store.getShopingCar()
  }


  onAddToShopingCart(product: Product) {
    // this.myShopingCart.push(product)
    // this.total = this.myShopingCart.reduce((sum, i) => sum + i.price, 0)

    this.store.onAddToShopingCart(product)
    this.total = this.store.getTotal()

  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
    this.statusDetail = "loading"
    this.productService.getProduct(id).subscribe(product => {
      this.productChose = product
      this.statusDetail = "success"
      if (!this.showProductDetail) {
        this.showProductDetail = true

      }

    }, errorMsg => {
      console.log(errorMsg)
      alert(errorMsg)
      this.statusDetail = 'error'
    })


    // this.productService.getProduct(id).subscribe(
    //   {
    //     next: (data) => {
    //       console.log(data)
    //     },
    //     error: (err) => {
    //       console.log(err)
    //     },
    //     complete: () => {
    //       console.log('se completo')
    //     }
    //   }
    // )

  }

  createNewProduct() {
    const idImage = Math.floor(Math.random() * 500);
    const product: CreateProductDTO = {
      title: 'Hola vecino',
      description: 'Como anda vecino, en que parte del curso va ',
      price: 200,
      images: [`https://picsum.photos/id/${idImage}/200/300`, `https://picsum.photos/id/${idImage + 1}/200/300`],
      categoryId: 1

    }
    this.productService.create(product).subscribe((data) => {
      this.products.unshift(data)
    })
  }

  updateProduct() {
    const id = this.productChose.id
    this.productService.update(id, {title: 'Nuevo titulo'}).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products[productIndex] = data
      this.toggleProductDetail()
    })
  }

  deletedProduct() {
    const id = this.productChose.id
    this.productService.delete(id).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products.splice(productIndex, 1)
      this.toggleProductDetail()

    })
  }


  onLoadMore() {
    this.loadMore.emit()
  }

  readAndupdate(id: string) {
    // this.productService.getProduct(id)
    //   .pipe(
    //     switchMap(product => this.productService.update(product.id, {title: 'change read and update'}))
    //   )
    //   .subscribe(data => {
    //     // resultado final
    //     console.log(data)
    //   })

    zip(
      this.productService.getProduct(id),
      this.productService.update(id, {title: 'zip update'}),
    )
      .subscribe(response => {
        console.log(response)
      })


  }

}
