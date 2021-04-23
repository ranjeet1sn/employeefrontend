
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProfileService } from '../shared/services/profile.service';
declare const L:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  name: FormControl;
  email: FormControl;
  address: FormControl;
  image: FormControl;
  number: FormControl;
  imagePreview: any;
  updateCondition = false;
  subscription: Subscription[] = [];
  id: string;
  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router:Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.name = new FormControl(null);
    this.address = new FormControl(null);
    this.image = new FormControl(null);
    this.number = new FormControl(null);
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decoded = helper.decodeToken(token)
      this.email = new FormControl(decoded.email);
    }
    this.getProfile();
    this.setMap();
  }
  setMap(){
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFuamVldHNuIiwiYSI6ImNrbmp3N3lrcjAyNG8ycW1wajRmOXUwdGsifQ.oAWJ4AlMpmsDNq12_lHNiQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoicmFuamVldHNuIiwiYSI6ImNrbmp3N3lrcjAyNG8ycW1wajRmOXUwdGsifQ.oAWJ4AlMpmsDNq12_lHNiQ',
        }
      ).addTo(mymap);
      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>I am here</b>').openPopup();
      })
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
      this.image.setValue(obj);
    }
    reader.readAsDataURL(file);
  }

  getProfile() {
    this.subscription.push(this.profileService.getProfile(this?.email?.value).subscribe((res: any) => {
      if (res && res.data) {
        this.updateCondition = true;
        this.name.setValue(res.data.name);
        this.image.setValue(res.data.image);
        this.address.setValue(res.data.address);
        this.number.setValue(res.data.number);
        this.imagePreview = res.data?.image?.base64;
        this.id = res.data._id
      }
    }));
  }

  onSubmit() {
    const obj = {
      name: this.name.value,
      email: this.email.value,
      image: this.image.value,
      number: this.number.value,
      address: this.address.value,
    }
    if (!this.updateCondition) {
      this.subscription.push(this.profileService.addProfile(obj).subscribe(res => {
        this.toastr.success('Profile Updated Succesfully');
        this.getProfile();
        this.router.navigate(['/home']);
      }))
    } else {
      this.subscription.push(this.profileService.upateProfile(obj, this.id).subscribe(res => {
        this.toastr.success('Profile Updated Succesfully')
        this.getProfile();
        this.router.navigate(['/home']);
      }));
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
