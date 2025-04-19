import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService {

  constructor(private http: HttpClient) {}

  getApiCall(apiUrl:string): Observable<any> {
    return this.http.get(apiUrl);
  }
}
