import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {CategoriesService} from "../../../services/categories.service";
import {Category} from "../../../models/category.model";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/users.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0
  categories: Category[] = []
  profile: User | null = null;

  constructor(
    private store: StoreService,
    private categoryService: CategoriesService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.store.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.getAllCategories()


    this.authService.user$
      .subscribe(data => {
        this.profile = data
      })

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

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }


  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
      .subscribe((data) => {
        // this.profile = data
        this.router.navigate(['/profile']);
      });
  }


}
