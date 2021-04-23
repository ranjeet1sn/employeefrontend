import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  uniqueEmail = false;
  id: any;
  imagePreview: string | ArrayBuffer;
  constructor(public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private postService: PostService
  ) {
    if (data) {
      this.id = data.id
      this.setEmployeeDetails(data);
    }
  }

  ngOnInit(): void {
    this.createEmployee();
  }

  createEmployee() {
    this.employeeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'department': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required)
    });
  }

  addEmployee() {
    if (!this.id) {
      this.postService.addUser(this.employeeForm.value).subscribe(res => {
        this.employeeForm.reset('');
        this.dialogRef.close(res);
      });
    }
    else {
      this.postService.updateuser(this.id, this.employeeForm.value).subscribe(res => {
        this.employeeForm.reset('');
        this.id = '';
        this.dialogRef.close(res);
      });
    }
  }
  setEmployeeDetails(data) {
    setTimeout(() => {
      this.employeeForm.patchValue({
        name: data.name,
        image: data.image,
        gender: data.gender,
        email: data.email,
        department: data.department,
        age: data.age
      });
      this.imagePreview = data.image.base64
    }, 200);

  }

  clearImage() {
    this.imagePreview = '';
    this.employeeForm.controls.image.setValue(null)
    this.employeeForm.get('image').updateValueAndValidity();
  }

  onImagePicked(event) {
    const obj: any = {};
    const file = event[0];
    obj.fileInformation = file;
    obj.fileName = obj.fileInformation.name;
    obj.fileType = obj.fileInformation.type;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      obj.base64 = reader.result;
      obj.base64Data = (String(obj.base64).split('base64,')[1]);
      this.employeeForm.controls.image.setValue(obj);
      this.employeeForm.get('image').updateValueAndValidity();
    }
    reader.readAsDataURL(file);
  }

  checkUniqueEmail() {
    this.postService.uniqueemail().subscribe((res: any) => {
      const data = res.data.filter(item => item.email == this.employeeForm.value.email)
      if (data && data.length > 0) {
        this.uniqueEmail = true;
      }
      else {
        this.uniqueEmail = false;
      }
    })
  }
}
