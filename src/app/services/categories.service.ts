import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/prduct.model";
import {environment} from "../../environments/environment";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API = `${environment.API_URL}/categories`

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number){
    let params = new HttpParams()
    if (limit != null && offset != null) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Category[]>(`${this.API}/`, {params})


  }
}
