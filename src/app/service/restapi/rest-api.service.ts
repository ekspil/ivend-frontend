import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthCheckDto} from "../../models/dto/auth-check-dto";
import {UserDto} from "../../models/dto/user-dto";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RestApiService {


  constructor(private http: HttpClient) {
  }

  public getAuth(username?, password?): Observable<AuthCheckDto> {
    return new Observable<AuthCheckDto>(observer => {
      let headers = new HttpHeaders();
      headers = this.addXRequestedWith(headers);

      if (username && password) {
        let authStr = btoa(`${username}:${password}`);
        headers = headers.set('Authorization', `Basic ${authStr}`);
      }

      const httpOptions = {
        headers: headers
      };

      this.http.get<AuthCheckDto>(`/api/auth/check`, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }


  public getProfile(): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.get<UserDto>(`/api/user`, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }

  public getUserById(id): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.get<UserDto>(`/api/user/` + id, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }


  public createUser(userDto): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.post<UserDto>(`/api/user/`, userDto, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }

  public modifyUserById(id, userDto): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.put<UserDto>(`/api/user/` + id, userDto, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }

  public deleteUserById(id): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.delete<UserDto>(`/api/user/` + id, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }


  public getAllUsers(): Observable<UserDto[]> {
    return new Observable<UserDto[]>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.get<UserDto[]>(`/api/user/getAll`, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }


  public updateProfile(userDto: UserDto): Observable<UserDto> {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.put<UserDto>(`/api/user`, userDto, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });
  }

  public logout() {
    return new Observable<UserDto>(observer => {
      let headers = new HttpHeaders();

      headers = this.addXRequestedWith(headers);

      const httpOptions = {
        headers: headers
      };

      this.http.get<UserDto>(`/api/auth/logout`, httpOptions)
        .subscribe(
          data => observer.next(data),
          error => {
            observer.error(error);
          }
        )
    });

  }

  private addXRequestedWith(headers: HttpHeaders): HttpHeaders {
    return headers.set('X-Requested-With', 'XMLHttpRequest');
  }
}



