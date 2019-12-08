import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient){ }

  authenticate(email: string, password:string){
    return this._http.post(`${API_URL}/login`, { email, password });
  };

};