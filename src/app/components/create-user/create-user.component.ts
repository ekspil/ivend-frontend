import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../models/dto/user-dto";
import {Router} from "@angular/router";
import {RestApiService} from "../../service/restapi/rest-api.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public user: UserDto;
  public error: string;

  constructor(private RestApiService: RestApiService, private Router: Router) {
  }

  ngOnInit() {
    this.error = null;
    IntervalObservable.create(5000)
      .subscribe(() => {
        if (this.error) {
          this.error = null;
        }
      });
  }

  onEventSubmit(event) {
    this.user = event;
    console.log(event, 'ev');
    this.RestApiService.createUser(this.user).subscribe((userDto) => {
      this.Router.navigate(['admin', 'dashboard'])
    }, err => {
      if (err.status === 400) {
        this.error = 'Could not create profile, some fields are not valid';
      } else if (err.status === 500) {
        this.error = 'Could not create profile, server error';
      }
        else if (err.status === 409) {
        this.error = 'Could not create profile. Profile with such id is already exists';
      } else {
        this.error = 'Could not create profile, unknown error';
      }
    })
  }
}
