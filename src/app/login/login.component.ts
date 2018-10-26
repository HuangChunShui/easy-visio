import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent  {
  constructor(private router: Router) {}
  login() {
    this.router.navigateByUrl('/full/home');
  }
}
