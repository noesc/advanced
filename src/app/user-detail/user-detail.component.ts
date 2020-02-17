import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';


@Component({
    selector:'user-detail',
    templateUrl:'./user-detail.component.html',
    styleUrls:['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit{

    constructor(private service : UsersService){
    }

    
    addUser(userName, name, eMail, phone){
        this.service.addUser(userName, name, eMail, phone);
    }

    editUser(){
        
    }

    ngOnInit(){

    }
}