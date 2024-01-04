import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Auth} from "../models/auth.model";
import {User} from "../models/users.model";
import {tap} from "rxjs/operators";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = `${environment.API_URL}/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API}/login`, {email, password})
      .pipe(
        tap(res => this.tokenService.saveToken(res.access_token))
      )
  }

  profile() {

    // let headers = new HttpHeaders()
    // headers = headers.set('Authorization', 'Bearer ' + token)
    //
    // return this.http.get<User>(`${this.API}/profile`, {
    //   headers
    // })
    return this.http.get<User>(`${this.API}/profile`)

  }


}
