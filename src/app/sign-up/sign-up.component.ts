import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signupForm  :any= FormGroup;
  constructor(private formBuilder:FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      fullName:[''],
      mobile:[''],
      email:[''],
      password:[''],
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/Users",this.signupForm.value)
      .subscribe(res=>{
        alert("SignUp Successfull");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=>{
        alert("Something wrong")
      })
  }

}
