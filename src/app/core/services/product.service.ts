import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  
  getProducts(pageNum:number = 1): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'categories');
  }

  getBrands(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'brands');
  }

  getBrandDetails(id:string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `brands/${id}`);
  }


  getProductDetails(id:string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `products/${id}`);
  }

  getCategoryDetails(id:string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `categories/${id}`);
  }

  getSubCategoryDetails(id:string | null): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `categories/${id}/subcategories/`);
  }
}
