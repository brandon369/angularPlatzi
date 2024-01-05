import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";
import {User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  user: User | null = null

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth.user$.subscribe(data => this.user = data)

    if (!this.user) {
      this.router.navigate(['/home'])
      return false
    }
    return true
  }

}
