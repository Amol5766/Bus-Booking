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

  loginObj = {
    emailId: '',
    password: '',
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
        const userData = res?.data || res;
        localStorage.setItem('redBusUser', JSON.stringify(userData));
        this.loggedUserData = userData;
        this.closeModel();
      },
      (error) => {
        alert('Registration failed: ' + JSON.stringify(error));
      }
    );
  }

  // ✅ Login method
  onLogin() {
    this.masterSrv.getUsers().subscribe(
      (users: any[]) => {
        const foundUser = users.find(
          (u) =>
            u.emailId === this.loginObj.emailId &&
            u.password === this.loginObj.password
        );

        if (foundUser) {
          localStorage.setItem('redBusUser', JSON.stringify(foundUser));
          this.loggedUserData = foundUser;
          alert('Login Successful');
          this.closeModel();
        } else {
          alert('Invalid email or password');
        }
      },
      (error) => {
        alert('Login failed: ' + JSON.stringify(error));
      }
    );
  }

  logoff() {
    localStorage.removeItem('redBusUser');
    this.loggedUserData = null;
  }
}
