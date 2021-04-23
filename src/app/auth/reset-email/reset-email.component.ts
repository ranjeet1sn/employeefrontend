import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {
  resetEmail:FormGroup;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.resetEmail = new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email])
    });
  }
  
  sendLink(){
    console.log(this.resetEmail.value);
    this.authService.sendEmail(this.resetEmail.value).subscribe(res=>{
      console.log(res);
      
    })
  }
}
