import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    }

  ngOnInit(): void {
  }

  getFileName(filename) {
    return filename.match(/.*\/(.*)$/)[1];
  }

  downloadImage() {
    const link = document.createElement('a');
    link.href = this.data.image;
    link.download = this.getFileName(this.data.image);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
