import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { ToasterService } from './toaster.service';

export interface IOptions {
  showAlert:boolean,
  message:string
}
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class ApiService {
 private toaster= inject(ToasterService)

  constructor(private http: HttpClient) { }

  login(object: any): Observable<any> {
    return this.http.post(
      baseUrl + `Authentication/login`,
      object
    );
  }

  post<T>(APIName: string, body: any ,options:IOptions={showAlert:false,message:''}): Observable<T> {

    return this.http
      .post(`${baseUrl}${APIName}`, body)
      .pipe(
        take(1),
        map((res: any) => {
          options.showAlert ?   this.toaster.successToaster(options.message) :''
          return res;
        })

      );
  }

  get<T>(APIName: string, params?: any, options: IOptions = { showAlert: false, message: '' }): Observable<T> {
    let queryParams: string[] = [];

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          queryParams.push(`${key}=${params[key]}`);
        }
      }
    }

    // Only append the '?' if there are query parameters.
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    return this.http.get(`${baseUrl}${APIName}${queryString}`).pipe(
      take(1),
      map((res: any) => {
        if (options.showAlert) {
          this.toaster.successToaster(options.message);
        }
        return res;
      })
    );
  }



  put<T>(APIName: string, body: any ,options:IOptions={showAlert:false,message:''}): Observable<T> {
    return this.http
      .put(`${baseUrl}${APIName}`, body)
      .pipe(
        take(1),
        map((res: any) => {
          options.showAlert ?   this.toaster.successToaster(options.message) :''
          return res;
        })

      );
  }

  putWithId<T>(APIName: string, id: any ,options:IOptions={showAlert:false,message:''}): Observable<T> {
    return this.http
      .put(`${baseUrl}${APIName}=${id}`, {})
      .pipe(
        take(1),
        map((res: any) => {
          options.showAlert ?   this.toaster.successToaster(options.message) :''
          return res;
        })

      );
  }

  delete<T>(APIName: string, id: string ,options:IOptions={showAlert:false,message:''}): Observable<T> {
    return this.http
      .delete(`${baseUrl}${APIName}=${id}`)
      .pipe(
        take(1),
        map((res: any) => {
          options.showAlert ?   this.toaster.successToaster(options.message) :''
          return res;
        })

      );
  }
}
