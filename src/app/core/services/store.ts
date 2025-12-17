import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/Products';
import { firstValueFrom } from 'rxjs';
import { StoreDebs } from '../models/StoreDebs';
import { StoreList } from '../models/StoreList';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private url = env.backend_url

  constructor(private http: HttpClient) {}

  async getProducts(): Promise<Products[]> {
    try{
      const prods = this.http.get<Products[]>(`${this.url}/products`)
      return await firstValueFrom(prods)
    } catch (err) {
      console.error('Error obteniendo productos: ', err)
      throw err
    }
  }

  async store(body: StoreDebs): Promise<any> {
    try {
      const store = this.http.post<any>(`${this.url}/store`, body)
      return await firstValueFrom(store)
    } catch (err) {
      console.error('Error obteniendo productos: ', err)
      throw err
    }
  }

  async getPending(ci: string): Promise<StoreList[]> {
    try {
      const pending = this.http.get<StoreList[]>(`${this.url}/store/${ci}`)
      return await firstValueFrom(pending)
    } catch (err) {
      console.error('Error obteniendo productos: ', err)
      throw err
    }
  }

}
