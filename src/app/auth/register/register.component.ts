
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeForm: FormGroup;
  type = true;
  disableForm:boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registeForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmpassword': new FormControl(null, [Validators.required])
    })
  }
  onSubmit() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const obj = {
      email: this.registeForm.value.email,
      password: this.registeForm.value.password,
      color: randomColor,
    }
    this.authService.registerUser(obj).subscribe(res => {
      this.registeForm.reset('');
      this.router.navigate(['/auth/login']);
    }
    ), (error => {
    });
  }
  onPasswordCheck() {
    if (this.registeForm.value.password != this.registeForm.value.confirmpassword) {
      this.toastr.error("Passowrd and Confirm Password must be same");
      this.disableForm = true;   
    } else {
      this.disableForm = false;
    }    
  }

}
