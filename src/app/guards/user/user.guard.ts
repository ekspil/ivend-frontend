import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {RestApiService} from "../../service/restapi/rest-api.service";

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(private Router: Router, private RestApiService: RestApiService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.RestApiService.getAuth()
        .subscribe(
          authCheckDTO => {
            let result = authCheckDTO.authenticated && authCheckDTO.role !== 'ROLE_ANONYMOUS';
            if (!result) {
              this.Router.navigate(['login']);
            }
            observer.next(result);
          },
          error => {
            this.Router.navigate(['login']);
            observer.next(false);
          }
        );
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
