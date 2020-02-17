import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri ='http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addUser(userName, name, eMail, phone)
  {
     return this.http.get(`${this.uri}`);
  }

  public get(){  
		return this.http.get(this.uri);  
	}
}
