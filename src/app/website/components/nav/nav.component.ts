import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {CategoriesService} from "../../../services/categories.service";
import {Category} from "../../../models/category.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0
  categories: Category[] = []

  constructor(
    private store: StoreService,
    private categoryService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.store.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCategories()
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll()
      .subscribe(data => {
        this.categories = data
      })
  }

}
