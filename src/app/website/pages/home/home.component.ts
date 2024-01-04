import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/prduct.model";
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10
  offset = 0

  products: Product[] = []

  productId: string | null = null

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.loadMore()

    this.route.queryParamMap.subscribe(paramas => {
      this.productId = paramas.get('product')
    })
  }

  loadMore() {
    this.productService.getAllProducts(this.limit, this.offset)
      .subscribe((data: Product[]) => {
        console.log(data)
        this.products = this.products.concat(data)
        this.offset += this.limit
      })
  }

}
