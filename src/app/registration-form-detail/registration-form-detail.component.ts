import { Component, OnInit, Inject } from '@angular/core';
import { RegistrationFormService } from '../registration-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-registration-form-detail',
  templateUrl: './registration-form-detail.component.html',
  styleUrls: ['./registration-form-detail.component.css']
})

export class RegistrationFormDetailComponent implements OnInit {

  registrationForm = {};
  advisorid: any;
  uid: any;
  all_crns = {};
  crn_array = [];
  my_crns = {};
  courses = [];
  advisorName: any;
  pin: any;
  photo: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private registrationFormService: RegistrationFormService) { }

  ngOnInit() {
    //registration Form Detiail
    this.getRegistrationFormDetail(this.route.snapshot.params['id']);
  }

  getRegistrationFormDetail(id) {
    //Api call to get registration form
    this.registrationFormService.showRegistrationForm(id).then((res) => {
      this.registrationForm = res;
      this.uid = this.registrationForm['uid'];
      this.advisorid = this.registrationForm['advisor']

      //functional call to get advisor information 
      this.getAdvisorInfo(this.advisorid);

      //function call to get student account information
      this.getStudentInfo(this.registrationForm['uid']);

      //api call to get CRN details for displaying
      this.registrationFormService.getCRN().then((res) => {
        this.all_crns = res[0];
        this.crn_array = this.registrationForm["crns"];
        console.log(this.crn_array);
        var i = 0;
        for (i = 0; i < this.crn_array.length; i++) { 
          if (this.crn_array[i] in this.all_crns){
            this.my_crns[this.crn_array[i]] = this.all_crns[this.crn_array[i]]
            this.courses.push(this.all_crns[this.crn_array[i]]);
          }
        }
        var myJSON1 = JSON.stringify(this.all_crns);
        var myJSON2 = JSON.stringify(this.my_crns);
        this.all_crns = JSON.parse(myJSON1);
        this.my_crns = JSON.parse(myJSON2);    
      }, (err) => {
        console.log(err);
      });
      this.uid = this.registrationForm['uid'];
    }, (err) => {
      console.log(err);
    });
  }

  getStudentInfo(uid){
    console.log(uid);
    this.registrationFormService.getUser(uid).then((result) => {
      let user = result;
      this.photo = user[0].image;
      console.log(this.photo);

      //console.log(user[0].name);
    }, (err) => {
      console.log(err);
    });;
  }

  getAdvisorInfo(advisorid){

    this.registrationFormService.getOneAdvisor(advisorid).then((result) => {
      console.log("This Advisor")
      console.log(result);
      this.advisorName = result[0]["name"]
    }, (err) => {
      console.log(err);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(RegistrationFormDetailAddCrnComponent, {
      width: '250px',
      disableClose: true,
      data: { pin: this.pin, term: this.registrationForm['term'], name: this.registrationForm['name'], studentId: this.registrationForm['studentId']  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.pin = result;
      console.log(this.pin)
    });
  }



}

@Component({
  selector: 'registration-form-detail-add-crn-dialog',
  templateUrl: 'registration-form-detail-add-crn-dialog.html',
})
export class RegistrationFormDetailAddCrnComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistrationFormDetailAddCrnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}