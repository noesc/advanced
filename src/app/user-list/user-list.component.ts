import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
    selector:'user-list',
    templateUrl:'./user-list.component.html',
    styleUrls:['./user-list.component.css']
})

export class UserListComponent implements OnInit{
    
    displayedColumns: string[] = ['userId', 'userName', 'name', 'email','phone','action'];
    dataSource = [];

    constructor(private service:UsersService){
        
    }
    ngOnInit(){
       this.service.getUsers().subscribe((data)=>{
           console.log(data);
           this.dataSource = data;
        });

    }
}