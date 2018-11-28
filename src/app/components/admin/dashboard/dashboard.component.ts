import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../../../service/restapi/rest-api.service";
import {UserDto} from "../../../models/dto/user-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private RestApiService: RestApiService, private Router: Router) {
  }

  public users: UserDto[];

  private error: string;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.RestApiService.getAllUsers().subscribe((userDTO) => {
        this.users = userDTO;
      }, error => {
        this.users = [];
        this.error = "Error";
      }
    )
  }

  createUser() {
    this.Router.navigate(['../user', 'create'])
  }

  deleteUser(id: number) {
    this.RestApiService.deleteUserById(id).subscribe(() => {
        this.getAllUsers();
      }, error => {
        this.getAllUsers();
      }
    )
  }

  openUser(id: number) {
    this.Router.navigate(['admin', 'user', 'edit', id]);
  }

}
