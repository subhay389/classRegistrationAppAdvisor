import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RegistrationFormService } from './registration-form.service';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { KeysPipe }from './filter.pipe';

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationFormCreateComponent } from './registration-form-create/registration-form-create.component';
import { RegistrationFormDetailComponent } from './registration-form-detail/registration-form-detail.component';
import { RegistrationFormEditComponent } from './registration-form-edit/registration-form-edit.component';
import { LoginPageComponent} from './login-page/login-page.component';

const ROUTES = [
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'registration-form/:id', component: RegistrationFormComponent },
  { path: 'registration-form-detail/:id', component: RegistrationFormDetailComponent },
  { path: 'registration-form-create/:id', component: RegistrationFormCreateComponent },
  { path: 'registration-form-edit/:id', component: RegistrationFormEditComponent }
];

let providers = {
  "google": {
    "clientId": "517663893817-getosg95ubfp7umt763hcnbeed5n6lkk.apps.googleusercontent.com"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    RegistrationFormCreateComponent,
    RegistrationFormDetailComponent,
    RegistrationFormEditComponent,
    LoginPageComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Angular2SocialLoginModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    RegistrationFormService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){}
}

Angular2SocialLoginModule.loadProvidersScripts(providers);