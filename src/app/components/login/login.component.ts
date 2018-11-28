import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RestApiService} from "../../service/restapi/rest-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public error: string;

  constructor(private fb: FormBuilder, private RestApiService: RestApiService, private Router: Router) {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  login() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    this.RestApiService.getAuth(username, password).subscribe((authCheckDTO) => {
      if (authCheckDTO.authenticated) {
        this.Router.navigate(['../home']);
      }
    }, error => {
      if (error.status === 401) {
        //bad password
        this.error = 'Bad credentials';
      } else if (error.status === 500) {
        this.error = 'Server error. Please, try again later.';
      }
    });
  }

}
