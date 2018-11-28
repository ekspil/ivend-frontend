import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {AdminGuard} from "./guards/admin/admin.guard";
import {UserGuard} from "./guards/user/user.guard";
import {HttpClientModule} from "@angular/common/http";
import {RestApiService} from "./service/restapi/rest-api.service";
import {ReactiveFormsModule} from "@angular/forms";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {UserCardComponent} from './components/user-card/user-card.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ControllersComponent } from './components/controllers/controllers.component';
import {HeaderComponent} from './components/header/header.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'controllers', component: ControllersComponent},
  {
    path: 'admin',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user',
        children: [
          {
            path: 'edit/:id',
            component: EditUserComponent
          },
          {
            path: 'create',
            component: CreateUserComponent
          }
        ]
      }
    ]
  },
  {path: 'home', component: HomeComponent, canActivate: [UserGuard]},
  {path: '**', redirectTo: 'home'}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent, DashboardComponent,
    EditUserComponent,
    UserCardComponent,
    CreateUserComponent,
    ControllersComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule,
  ],
  providers: [UserGuard, AdminGuard, RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
