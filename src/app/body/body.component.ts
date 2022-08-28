import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DataModel} from "../../../model/dataModel";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public formGroup:any=FormGroup;
  tableOfData!:  DataModel[];

  constructor(private formBuilder : FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      firstName:[''],
      question:[''],
      location:['']

    })
    this.http.get<any>("http://localhost:3000/tableOfQuestion")
      .subscribe((res:DataModel[])=>{
        console.log(res)
        this.tableOfData=res
      })
  }

  ask() {
    let formData :any =   new FormData();
    formData.append('firstName', this.formGroup.get('firstName').value);
    formData.append('question', this.formGroup.get('question').value);
    formData.append('location', this.formGroup.get('location').value);
    this.http
      .post<any>('http://localhost:3000/tableOfQuestion', formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    /*this.http.post<any>("http://localhost:3000/tableOfQuestion",this.formGroup.value)
      .toPromise().then(res=>{
        this.tableOfData.push({firstName: this.formGroup.firstName,
          location:this.formGroup.location,
          question:this.formGroup.question})
        this.formGroup.reset();
      },err=>{
        alert("Something wrong")
      })*/
     //add http.post to post question to back-end
    // add the question
  }

  displayedColumns: string[] = ['firstName','question','location'];
}
