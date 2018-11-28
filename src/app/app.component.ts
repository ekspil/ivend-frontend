import {Component, OnInit} from '@angular/core';
import {RestApiService} from "./service/restapi/rest-api.service";
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  role: string;


  constructor(private RestApiService: RestApiService, private Router: Router) {
    this.role = null;
  }

  ngOnInit(): void {
    this.Router.events.subscribe((event) => {
      this.getAuth();
    });
    this.getAuth();
  }

  getAuth() {
    this.RestApiService.getAuth().subscribe(
      (AuthCheckDto) => {
        this.role = AuthCheckDto.role;
      },
      err => {
        this.role = null;
      }
    )
  }

  logout() {
    this.RestApiService.logout().subscribe((t) => {
      this.Router.navigate(['login']);
    }, err => {
      Cookie.delete('JSESSIONID');
      this.Router.navigate(['login']);
    })
  }

}
