import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/prduct.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',
  }

  @Output()  addedProduct = new EventEmitter<Product>()


  constructor() {
  }

  ngOnInit(): void {
  }

  onAddtoCart(){
    this.addedProduct.emit(this.product)
  }

}