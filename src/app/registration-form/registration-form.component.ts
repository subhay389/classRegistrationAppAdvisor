import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationFormService } from '../registration-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { LoginPageComponent } from '../login-page/login-page.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Injectable()

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit{

  uid: any;
  registrationForm: any;
  displayedColumns = ['name', 'studentId', 'term', 'pin', '_id'];
  pendingForms: any;
  approvedForms: any;

  
    
  constructor(private route: ActivatedRoute, private router: Router, private registrationFormService: RegistrationFormService) { }

  ngOnInit() {
    this.getRegistrationFormList(this.route.snapshot.params['id']);

    this.getLoginId(this.route.snapshot.params['id']);

  }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  //applyting filter for table
  applyFilterForPending(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTablependingForms defaults to lowercase matches
    this.pendingForms.filter = filterValue;

  }

  applyFilterForApproved(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTablependingForms defaults to lowercase matches
    this.approvedForms.filter = filterValue;

  }

  ngAfterViewInit() {
    this.pendingForms.paginator = this.paginator;
    this.approvedForms.paginator = this.paginator;
  }

  getLoginId(id){
    this.uid = id;
  }

  hack(val) {
    return Array.from(val);
  }


  nagivageDetailsPage(formID){
    console.log("form id: " + formID)
    this.router.navigate(['/registration-form-detail', formID]);
  }

  navigateCreatePage(){
    this.router.navigate(['/registration-form-create', this.uid]);
  }

  getRegistrationFormList(name) {
    this.registrationFormService.getAllRegistrationForm(name).then((res) => {
      this.registrationForm = res;
      console.log("all forms of a advisor" );
      console.log(this.registrationForm);
      
      //pendingForms for table
      var i;
      var pending = [];
      var approved = []
      for (i = 0; i < this.registrationForm.length; i++){
        if (this.registrationForm[i]['pin']== 'N/A'){
            pending.push(this.registrationForm[i]);
        }
        else{
            approved.push(this.registrationForm[i]);
        }
      }
      this.pendingForms = new MatTableDataSource(pending);
      this.approvedForms = new MatTableDataSource(approved);
    }, (err) => {
      console.log(err);
    });
  }
  

}
