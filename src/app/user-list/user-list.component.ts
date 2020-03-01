import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
    selector:'user-list',
    templateUrl:'./user-list.component.html',
    styleUrls:['./user-list.component.css']
})

export class UserListComponent implements OnInit{
    
    displayedColumns: string[] = ['userId', 'userName', 'name', 'email','phone','action'];
    dataSource = [];

    constructor(private service:UsersService, private router: Router){
        
    }
    ngOnInit(){
      this.loadUsers();
    }

    loadUsers(){

        this.service.getUsers().subscribe((data)=>{
            console.log(data);
            this.dataSource = data;
         });
    }

    editUser(id:number){
        this.router.navigate([`user/edit/${id}`])
    }

    deleteUser(id:number){
        this.service.deleteUser(id).subscribe((data)=>{
            this.loadUsers();
        })
    }
}