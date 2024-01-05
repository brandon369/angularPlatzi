import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";
import {TokenService} from "../services/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken()
    if (!token) {
      this.router.navigate(['/home']);
      return false
    }
    return true;


    // return this.auth.user$.pipe(
    //   map(user => {
    //     console.log(user)
    //     console.log(user)
    //     console.log(user)
    //     if (!user) {
    //       this.router.navigate(['/home']);
    //       return false
    //     }
    //     return true
    //   })
    // )

  }

}
