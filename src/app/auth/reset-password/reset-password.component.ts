import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
   resetPassword:FormGroup;
   disableButton:boolean = true;
   decodedToken:any;
  constructor(
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res=>{
      const token =res['token'];
      const helper= new JwtHelperService();
      this.decodedToken =helper.decodeToken(token); 
    });
    this.resetPasswordForm();
  }
  resetPasswordForm(){
    this.resetPassword =new FormGroup({
      'password':new FormControl(null,[Validators.required]),
      'confirmpassword':new FormControl(null,[Validators.required])
    })
  }
  onPasswordCheck() {
    if (this.resetPassword.value.password != this.resetPassword.value.confirmpassword) {
      this.toastr.error("Passowrd and Confirm Password must be same");
      this.disableButton = true;   
    } else {
      this.disableButton = false;
    }    
  }

  onResetPassword(){
    const id=this.decodedToken.userId;
    const userObj = {
      email:this.decodedToken.email,
      color:this.decodedToken.color,
      password:this.resetPassword.value.password
    }
    this.authService.resetPassword(id,userObj).subscribe(res=>{
      this.toastr.success('Password Updated Successfully');
      this.resetPassword.reset('');
      this.router.navigate(['/auth/login'])
    })
  }
  
   
}
