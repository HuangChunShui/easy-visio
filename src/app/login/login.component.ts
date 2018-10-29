import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {FlowchartService} from '../services/flowchart.service';
import {Message} from 'primeng/api';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent  {
  username = '';
  password = '';
  msgs: Message[] = [];
  constructor(private router: Router, private flowchartService: FlowchartService) {}
  login() {
    const data = {username: this.username, password: this.password};
    this.flowchartService.login(data).then((res: any) => {
      localStorage.setItem('username', JSON.parse(res).username);
      this.router.navigateByUrl('/full/flowchart');
    }, (err) => {
      console.error(err.error.errorMsg);
      this.showError(err.error.errorMsg);
    });
  }
  showError(errMsg) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: '登陆失败,', detail: errMsg});
  }
}
