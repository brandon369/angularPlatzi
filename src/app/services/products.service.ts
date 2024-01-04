import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/prduct.model";
import {catchError, retry, map} from "rxjs/operators";
import {throwError} from "rxjs";

import {environment} from './../../environments/environment'
import {checkTime} from "../interceptors/time.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API = `${environment.API_URL}`

  // private API = 'https://api.escuelajs.co/api/v1/products'

  constructor(
    private http: HttpClient
  ) {
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit != null && offset != null) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
      return this.http.get<Product[]>(`${this.API}/products`, {params})
        .pipe(
          retry(3),
          map(data => data.map(item => {
            return {
              ...item,
              taxes: .19 * item.price
            }
          }))
        )
    } else {
      return this.http.get<Product[]>(`${this.API}/products`)
        .pipe(
          retry(3)
        )

    }


  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.API}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError('Error de servidor :c')

          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('Producto no existe')
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('Sin permisos so, ')
          }
          return throwError('Ups algo salio mal')

          // versiones posteriores
          // return throwError(()=>'You must be logged in to access this product');
        })
      )
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(`${this.API}/products`, data, {context: checkTime()})
  }

  update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API}/products/${id}`, data)

  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.API}/products/${id}`,)

  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit != null && offset != null) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }

    return this.http.get<Product[]>(`${this.API}/categories/${categoryId}/products`, {params})


  }


}
