import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationFormService } from '../registration-form.service';

@Component({
  selector: 'app-registration-form-edit',
  templateUrl: './registration-form-edit.component.html',
  styleUrls: ['./registration-form-edit.component.css']
})
export class RegistrationFormEditComponent implements OnInit {

  registrationForm = {};
  
  constructor(private registrationFormService: RegistrationFormService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRegistrationForm(this.route.snapshot.params['id']);
  }

  getRegistrationForm(id) {
    console.log(id);
    this.registrationFormService.showRegistrationForm(id).then((res) => {
      this.registrationForm = res;
    }, (err) => {
      console.log(err);
    });
  }

  updateRegistrationForm(id) {
    
    var newRegistrationForm = {
      uid: this.registrationForm['uid'],
      studentId: this.registrationForm["studentId"],
      name: this.registrationForm["name"],
      degree: this.registrationForm["degree"],
      email: this.registrationForm["email"],
      advisor: this.registrationForm["advisor"],
      term: this.registrationForm["term"],
      crns: ((this.registrationForm["crns"])+ "").split(","),
      isApproved: this.registrationForm["isApproved"],
      updated_at: Date.now
    }
    this.registrationFormService.updateRegistrationForm(id, newRegistrationForm).then((result) => {
      this.router.navigate(['/registration-form-detail', id]);
    }, (err) => {
      console.log(err);
    });
  }


}
