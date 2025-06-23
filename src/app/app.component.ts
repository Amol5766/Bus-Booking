import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { NgIf, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, NgIf, NgClass, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bus-booking-angular-18';
  isLoginForm: boolean = true;

  masterSrv = inject(MasterService);
  loggedUserData: any = null;

  registerObj: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    role: '',
    createdDate: new Date(),
    password: '',
    projectName: '',
    refreshToken: '',
    refreshTokenExpiryTime: new Date(),
  };

  constructor() {
    const localUser = localStorage.getItem('redBusUser');
    try {
      if (localUser && localUser !== 'undefined') {
        this.loggedUserData = JSON.parse(localUser);
      }
    } catch (e) {
      console.error('Error parsing localStorage redBusUser:', e);
      localStorage.removeItem('redBusUser');
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    const model = document.getElementById('myModal');
    if (model) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    this.masterSrv.onRegisterUser(this.registerObj).subscribe(
      (res: any) => {
        alert('User Registered Successfully');
        if (res?.data) {
          localStorage.setItem('redBusUser', JSON.stringify(res.data));
          this.loggedUserData = res.data;
        } else {
          // fallback if res is not structured
          localStorage.setItem('redBusUser', JSON.stringify(res));
          this.loggedUserData = res;
        }
        this.closeModel();
      },
      (error) => {
        alert('Registration failed: ' + JSON.stringify(error));
      }
    );
  }

  logoff() {
    localStorage.removeItem('redBusUser');
    this.loggedUserData = null;
  }
}
