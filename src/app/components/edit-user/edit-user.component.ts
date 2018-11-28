import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../models/dto/user-dto";
import {RestApiService} from "../../service/restapi/rest-api.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: UserDto;
  public error: string;
  public updated: boolean;
  private id: number;

  constructor(private route: ActivatedRoute, private RestApiService: RestApiService) {
  }

  ngOnInit() {
    this.updated = false;
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.id = id;
      this.RestApiService.getUserById(id).subscribe((userDto) => {
        this.user = userDto;
      }, error => {
        this.error = 'Sorry, could not load user with id ' + id;
      })
    });

    IntervalObservable.create(5000)
      .subscribe(() => {
        if (this.updated) {
          this.updated = false;
        }
      });
  }


  onEventSubmit(event) {
    this.user = event;
    this.RestApiService.modifyUserById(this.id, this.user).subscribe((userDto) => {
      this.user = userDto;
      this.updated = true;
    }, err => {
      this.error = 'Could not update profile, try again later.';
      this.updated = false;
    })
  }
}

