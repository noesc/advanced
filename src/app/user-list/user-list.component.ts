import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';

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
        this.service.get().subscribe((data: any[])=>{  
			console.log(data);  
			this.dataSource = data;  
		}) 

    }
}