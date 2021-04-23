import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  type = true;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }
  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe(res => {
      this.toastr.success('Login Successfull')
    }
    ), (error => {
    })
  }

}

