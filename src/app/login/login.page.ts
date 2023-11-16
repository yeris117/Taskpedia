import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = "";
  contrasenia = "";


  constructor(private router: Router) { }

  ingresar() {
    if (this.usuario === "admin" && this.contrasenia === "admin") {
      this.router.navigate(['/home']); 
    } else {
      

    }
  }

  ngOnInit() {
  }

}
