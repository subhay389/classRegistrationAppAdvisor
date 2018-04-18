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
  previous_crns: any;
  advisorName: any;
  pin: any;
  photo: any;
  formId: any;
  reason: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private registrationFormService: RegistrationFormService) { }

  ngOnInit() {
    //registration Form Detiail
    this.getRegistrationFormDetail(this.route.snapshot.params['id']);
    this.formId = this.route.snapshot.params['id']
    
  }

  getRegistrationFormDetail(id) {
    //Api call to get registration form
    this.registrationFormService.showRegistrationForm(id).then((res) => {
      this.registrationForm = res;
      this.uid = this.registrationForm['uid'];
      this.advisorid = this.registrationForm['advisor']
      this.pin = this.registrationForm['pin']
      this.reason = this.registrationForm['reason']

      //functional call to get advisor information 
      this.getAdvisorInfo(this.advisorid);

      //function call to get student account information
      this.getStudentInfo(this.registrationForm['uid']);

      //api call to get CRN details for displaying
      // this.registrationFormService.getCRN().then((res) => {
      //   this.all_crns = res[0];
      //   this.crn_array = this.registrationForm["crns"];
      //   console.log(this.crn_array);
      //   var i = 0;
      //   for (i = 0; i < this.crn_array.length; i++) { 
      //     if (this.crn_array[i] in this.all_crns){
      //       this.my_crns[this.crn_array[i]] = this.all_crns[this.crn_array[i]]
      //       this.courses.push(this.all_crns[this.crn_array[i]]);
      //     }
      //   }
      //   var myJSON1 = JSON.stringify(this.all_crns);
      //   var myJSON2 = JSON.stringify(this.my_crns);
      //   this.all_crns = JSON.parse(myJSON1);
      //   this.my_crns = JSON.parse(myJSON2);    
      // }, (err) => {
      //   console.log(err);
      // });
      this.getCourseByCRN();
      this.getStudentPreviousCRN(this.uid);

      //api call to get all previous courses by student
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

  getCourseByCRN(){
    this.registrationFormService.getCRN().then((res) => {
      this.all_crns = res[0];
      this.crn_array = this.registrationForm["crns"];
      console.log(this.crn_array);
      this.my_crns = this.crnNumberToCourse(this.crn_array);
    }, (err) => {
      console.log(err);
    });
  }

  getStudentPreviousCRN(uid){
    this.registrationFormService.getStudentCRN(uid).then((result) => {
      console.log("Student CRN");
      console.log(result);
      var crn_prev_array = Object.values(result);
      console.log(crn_prev_array);
      crn_prev_array = this.arr_diff(this.crn_array, crn_prev_array)
      console.log(crn_prev_array);
      console.log("done");
      this.previous_crns = this.crnNumberToCourse(crn_prev_array);
    }, (err) => {
      console.log(err);
    });
  }

  crnNumberToCourse(required_crns){
    var result_crn_object = {}
    var i = 0;
      for (i = 0; i < required_crns.length; i++) { 
        if (required_crns[i] in this.all_crns){
          result_crn_object[required_crns[i]] = this.all_crns[required_crns[i]]
          this.courses.push(this.all_crns[required_crns[i]]);
        }
      }
      var myJSON1 = JSON.stringify(this.all_crns);
      var myJSON2 = JSON.stringify(result_crn_object);
      this.all_crns = JSON.parse(myJSON1);
      result_crn_object = JSON.parse(myJSON2);
      return result_crn_object;
  }

  arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}

  openPinDialog(): void {
    let dialogRef = this.dialog.open(RegistrationFormDetailAddCrnComponent, {
      width: '250px',
      disableClose: true,
      data: { pin: this.pin, term: this.registrationForm['term'], name: this.registrationForm['name'], studentId: this.registrationForm['studentId']  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == undefined){
        this.pin = this.registrationForm['pin']
        console.log("PIN when left blank:" + this.pin)
      }
      else{
        this.pin = result;
        var reason = 'N/A'
        var status = true
        this.savePin(this.pin, this.formId, reason, status);
        console.log("new pin" + this.pin)

        window.location.reload();
      }
    });
  }

  openRejectDialog(): void {
    let dialogRef = this.dialog.open(RegistrationFormDetailRejectComponent, {
      width: '250px',
      disableClose: true,
      data: { reason: this.registrationForm['reason'], pin: this.pin, term: this.registrationForm['term'], name: this.registrationForm['name'], studentId: this.registrationForm['studentId'], formId: this.registrationForm['id']  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == undefined){
        this.pin = this.registrationForm['pin']
        console.log("PIN when left blank:" + this.pin)
      }
      else{
        this.pin = "Not Approved";
        var reason = result;
        var status = false;
        this.savePin(this.pin, this.formId, reason, status);
        console.log("new pin" + this.pin)

        window.location.reload();
      }
    });
  }

  savePin(newPin, id, reason, status){
    var newRegistrationForm = {
      uid: this.registrationForm['uid'],
      studentId: this.registrationForm["studentId"],
      name: this.registrationForm["name"],
      degree: this.registrationForm["degree"],
      email: this.registrationForm["email"],
      advisor: this.registrationForm["advisor"],
      term: this.registrationForm["term"],
      crns: ((this.registrationForm["crns"])+ "").split(","),
      isApproved: status,
      updated_at: Date.now,
      pin: newPin,
      reason: reason
    }
    this.registrationFormService.updateRegistrationForm(id, newRegistrationForm).then((result) => {
      this.sendEmail(newRegistrationForm);
      this.router.navigate(['/registration-form-detail', id]);
    }, (err) => {
      console.log(err);
    });
  }

  sendEmail(form){
    this.registrationFormService.sendEmail(form).then((result) => {
      console.log("email sent")
    }, (err) => {
      console.log(err);
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

@Component({
  selector: 'registration-form-detail-reject-dialog',
  templateUrl: 'registration-form-detail-reject-dialog.html',
})
export class RegistrationFormDetailRejectComponent {

  constructor( 
    public dialogRef: MatDialogRef<RegistrationFormDetailRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {

    this.dialogRef.close();

  }

}