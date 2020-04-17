import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }
  login(data: any) {
    this.AuthService.login(data.email, data.password);
  }

}
