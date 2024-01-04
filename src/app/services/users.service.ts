import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateUserDTO, User} from "../models/users.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API = `${environment.API_URL}/users`

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<User[]>(this.API)
  }

  create(user: CreateUserDTO) {
    return this.http.post<User>(this.API, user)

  }

}
