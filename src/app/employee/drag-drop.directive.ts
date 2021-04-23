import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @HostBinding('style.background-color') private background = '#f7f7f7'
  @HostBinding('style.opacity') private opacity = '1';
  @Output() dropFiles = new EventEmitter<any>();
  constructor() { }

  @HostListener('dragover', ['$event']) onDrag(event) {
    this.background = '#8cc6b7';
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.background = '#f7f7f7'
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f7f7f7'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.dropFiles.emit(files);
    }
  }
}



