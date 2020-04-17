import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(data: any) {
    this.AuthService.crearUsuario(data.nombre, data.email, data.password);
  }

}
