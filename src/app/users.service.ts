import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { User } from './user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri ='http://localhost:51290/api/user';

  constructor(private http: HttpClient) { }

  public addUser(user: User) {
     return this.http.post(`${this.uri}/create`, user ,httpOptions);
  }

  public editUser(user: User) {
     return this.http.put(`${this.uri}/edit`, user ,httpOptions);
  }

  public deleteUser(userId:number){
    return this.http.delete(`${this.uri}/delete/${userId}`,httpOptions);
  }

  public getUsers(): Observable<User[]>{  
		return this.http.get<User[]>(`${this.uri}/list`,httpOptions);
  }
  
  public getUser(userId:number):Observable<User>{
    return this.http.get<User>(`${this.uri}/get/${userId}`,httpOptions);
  }
}
