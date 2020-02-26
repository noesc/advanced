import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../user';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector:'user-detail',
    templateUrl:'./user-detail.component.html',
    styleUrls:['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit{
    
    public errorMessage: string = '';
    public message: string = '';

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    userFormControl = new FormControl('', [
        Validators.required
      ]);
    nameFormControl = new FormControl('', [
        Validators.required
      ]);
    
      matcher = new MyErrorStateMatcher();

    constructor(private service : UsersService, private errorHandler: ErrorHandlerService, private router: Router){
    }
    
    ngOnInit(){

    }

    setData(userId, userName, name, eMail, phone):User{
      var user = new User();
      user.UserId = userId;
      user.UserName= userName;
      user.Name = name;
      user.Phone = phone;
      user.Email = eMail;
      return user;
    }

    addUser(user:User){
      
      this.service.addUser(user)
      .subscribe(res => {
        this.message = "The user was created successfully";
        alert(this.message);
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
      );
    }

    editUser(user:User){
      this.service.editUser(user)
      .subscribe(res => {
        this.message = "The user was edited successfully";
        alert(this.message);
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
      );
    }

    save(userId, userName, name, eMail, phone){
      var user = this.setData(userId, userName, name, eMail, phone);
      if(userId == null){
        this.addUser(user);
      }else{
        this.editUser(user);
      }
    }

    redirectToList(){
      this.router.navigate(['']);
    }
}