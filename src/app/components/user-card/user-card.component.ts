import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserDto} from "../../models/dto/user-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit, OnChanges {

  role: string;

  form: FormGroup;

  @Input('user')
  user: UserDto;

  @Input('method')
  method: string;

  @Output()
  submitEvent: EventEmitter<UserDto> = new EventEmitter<UserDto>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      login: [null, Validators.required],
      about: [null, Validators.required],
      address: [null, Validators.required],
      password: [null],
      role: ['ROLE_USER'],
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && this.user) {
      this.updateUserModel(this.user);
    }
  }


  public eventSubmit() {
    let user: UserDto = {
      id: null,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      dateOfBirth: this.form.controls.dateOfBirth.value,
      login: this.form.controls.login.value,
      about: this.form.controls.about.value,
      address: this.form.controls.address.value,
      role: this.form.controls.role.value || 'ROLE_USER',
      password: this.form.controls.password.value
    };

    this.submitEvent.emit(user);
  }


  private updateUserModel(userDTO): void {
    this.form.controls.firstName.setValue(userDTO.firstName || null);
    this.form.controls.lastName.setValue(userDTO.lastName || null);
    this.form.controls.dateOfBirth.setValue(userDTO.dateOfBirth || null);
    this.form.controls.login.setValue(userDTO.login || null);
    this.form.controls.about.setValue(userDTO.about || null);
    this.form.controls.address.setValue(userDTO.address || null);
    this.form.controls.role.setValue(userDTO.role || null);
  }
}
