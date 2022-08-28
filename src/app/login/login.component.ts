import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formGroup:any=FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      email:[''],
      password:[''],
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/Users")
      .subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.formGroup.value.email && a.password === this.formGroup.value.password
        });
        if(user){
          alert("login success");
          this.formGroup.reset();
          this.router.navigate(['body']);
        }else {
          alert("user not found");
        }
      },error =>
        alert("impossible"));
  }
}
