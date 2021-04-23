import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImagePreviewComponent } from 'src/app/image-preview/image-preview.component';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post: any;
  subscription:Subscription[] =[];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.subscription.push(this.postService.singlePost(res['id']).subscribe((res:any) => {
       this.post=res.data;
      }));
    });
  }
  
  onPreviewImage(image) {
    if(image){
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      data: {
        image: image
      }
    })};
  }
  
  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
} 
