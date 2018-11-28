import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../../service/restapi/rest-api.service";
import {UserDto} from "../../models/dto/user-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private RestApiService: RestApiService, private fb: FormBuilder) {
  }

  public user: UserDto;
  private form: FormGroup;
  public error: String;
  private role: String;
  public updated: boolean;

  ngOnInit() {
    this.getProfile();

    IntervalObservable.create(3000)
      .subscribe(() => {
        if (this.updated) {
          this.updated = false;
        }
      });
  }

  private getProfile(): void {
    this.RestApiService.getProfile().subscribe((userDTO) => {
        this.user = userDTO;
      }, error => {
        this.error = "There was error loading the profile. Try again later.";
      }
    )

  }

  onEventSubmit(event) {
    this.user = event;
    this.RestApiService.updateProfile(this.user).subscribe((userDto) => {
      this.user = userDto;
      this.updated = true;
    }, err => {
      this.error = 'Could not update profile, try again later.';
      this.updated = false;
    })
  }

}
