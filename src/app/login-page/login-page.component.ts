import { Component, OnDestroy } from '@angular/core';
import { RegistrationFormService } from '../registration-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {

  public user;
  sub: any;
  data: any;

  constructor(public _auth: AuthService, private router: Router, private registrationFormService: RegistrationFormService){ }

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
          (data) => {
                  this.data = data;
                  //user data 
                  //name, image, uid, provider, uid, email, token (accessToken for Facebook & google, no token for linkedIn), idToken(only for google) 
                  this.saveUser()
                }
    )
    console.log(this.sub)
  }

  saveUser(){
    var newForm = {
      name: this.data.name,
      image: this.data.image,
      uid: this.data.uid,
      provider: this.data.provider,
      email: this.data.email,
      token: this.data.token,
    }
    console.log(newForm);
    this.registrationFormService.saveUser(newForm).then((res) => {
      this.router.navigate(['/registration-form', this.data.uid]);
    }, (err) => {
      console.log(err);
    });

  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{console.log(data);this.user=null;}
    )
    this.router.navigate(['/registration-form']);
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
