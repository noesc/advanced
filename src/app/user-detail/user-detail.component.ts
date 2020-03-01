import { Component, OnInit } from "@angular/core";
import { UsersService } from '../users.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../user';
import { ErrorHandlerService } from '../error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Observable } from 'rxjs';
import { error } from 'protractor';

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

    idFormControl = new FormControl('');

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
    
    phoneFormControl = new FormControl('');

    matcher = new MyErrorStateMatcher();

    constructor(private service : UsersService, private errorHandler: ErrorHandlerService, 
      private router: Router, private route: ActivatedRoute){
    }
    
    ngOnInit(){
      this.route.params.subscribe(params => {
        if(params.id != 'undefined' && params.id){
          this.loadUser(params.id);
        }
        
      })
    }

    loadUser(id:number){
      this.service.getUser(id)
      .subscribe((data) =>{
        this.idFormControl.setValue(data.userId);
        this.userFormControl.setValue(data.userName);
        this.nameFormControl.setValue(data.name);
        this.emailFormControl.setValue(data.email);
        this.phoneFormControl.setValue(data.phone);
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
      )
    }

    setData(userId, userName, name, eMail, phone):User{
      var user = new User();
      user.userId = Number(userId);
      user.userName= userName;
      user.name = name;
      user.phone = phone;
      user.email = eMail;
      return user;
    }

    addUser(user:User){
      
      this.service.addUser(user)
      .subscribe(res => {
        this.message = "The user was created successfully";
        if(confirm(this.message)){
          this.redirectToList();
        }
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
        if(confirm(this.message)){
          this.redirectToList();
        }
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
      );
    }

    save(userId, userName, name, eMail, phone){
      var user = this.setData(userId, userName, name, eMail, phone);
      if(typeof userId != 'undefined' && userId){
        this.editUser(user);
      }else{
        user.userId = null;
        this.addUser(user);
      }
    }

    redirectToList(){
      this.router.navigate(['']);
    }
}