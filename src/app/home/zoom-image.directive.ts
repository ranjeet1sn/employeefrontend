import { Directive } from '@angular/core';
import Hammer from 'hammerjs';
import { Input, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';
interface ImgParams {
  width?: number;
  height?: number;
  top: number;
  left: number;
}

interface CheckParams {
  newWidth: number;
  newHeight: number;
  imgPosX: number;
  imgPosY: number;
  maxOffsetX: number;
  maxOffsetY: number;
}

interface ZoomParams {
  shift: number;
  x?: number;
  y?: number;
}

const enum Fits {
  ScaleDown = 'scale-down',
  Cover = 'cover',
  Natural = 'natural',
  Default = 'fit',
}

const enum Directions {
  Center = 'center',
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right'
}
@Directive({
  selector: '[appZoomImage]'
})
export class ZoomImageDirective {

  @Input('zoom-initial-position') initialPosition: { top: Directions, left: Directions } = {
    top: Directions.Center,
    left: Directions.Center
  };
  @Input('zoom-initial-fit') initialFit?: Fits;
  private zoomMin = 1;
  @Input('zoom-max') zoomMax = 3;
  private mc;
  private img: HTMLImageElement;
  private container: HTMLElement;
  private zoomStep = 0.1;
  private zoomCurrent = 1;
  private ratio = 1;
  private initialParams = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  private currentParams = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    pWidth: 0,
    pHeight: 0,
    pLeft: null,
    pTop: null
  };
  private handlers = {
    moveHandler: null,
    removeHandler: null,
    downHandler: null,
    containerPreventing: null
  }
  private previousCoords = { x: 0, y: 0 };
  private shift = { x: 0, y: 0 };
  private hammertime;

  constructor(public imageRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.img = this.imageRef.nativeElement;
    this.container = this.img.parentElement;
    this.initialFit = this.initialFit || Fits.Natural;
    this.addEvents();
  }
  ngOnDestroy(): void {
    this.renderer2.removeStyle(this.container, 'touch-action');
    if (this.hammertime) {
      this.hammertime.destroy();
    }
    if (this.mc) {
      this.mc.destroy();
    }
    if (this.handlers.containerPreventing) {
      this.container.removeEventListener('mousedown', this.handlers.containerPreventing);
    }
    if (this.handlers.removeHandler) document.removeEventListener("mouseleave", this.handlers.removeHandler);
  }

  private addEvents() {
    this.img.addEventListener("load", e => {
      this.setInitialParams();
    });
    this.mc = new Hammer.Manager(this.img, {
      defaults: {
        domEvents: false,
        preventDefault: true
      },
      recognizers: [
        [
          Hammer.Pan
        ]
      ]
    });
    this.hammertime = new Hammer(this.container, {});
    this.hammertime.get('pinch').set({ enable: true });
    let startScale = null;
    this.hammertime.on('pinchstart', (e) => {
      startScale = e.scale;
    });
    this.hammertime.on('pinch', (e) => {
      this.zoomCurrent -= (startScale - e.scale);
      startScale = e.scale;
      this.zoomCurrent = Math.min(Math.max(this.zoomMin, this.zoomCurrent), this.zoomMax);
      const x = e.srcEvent.pageX - this.getContainerPosition().pLeft;
      const y = e.srcEvent.pageY - this.getContainerPosition().pTop;
      this.zoom({ shift: startScale - e.scale, x, y });
    });

    this.mc.on("panstart", ev => {
      ev.preventDefault();
      this.onMouseDown(ev.srcEvent);
    });
    this.container.addEventListener('mousedown', this.handlers.containerPreventing = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    this.container.addEventListener('dragstart', this.handlers.containerPreventing = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
  }

  private setInitialParams() {
    this.ratio = this.img.naturalWidth / this.img.naturalHeight;
    this.currentParams.pHeight = this.container.offsetHeight;
    this.currentParams.pWidth = this.container.offsetWidth;

    switch (this.initialFit) {
      case 'scale-down':
        this.initialParams.width = this.currentParams.pWidth;
        this.initialParams.height = this.initialParams.width / this.ratio;
        if (this.initialParams.height > this.currentParams.pHeight) {
          this.initialParams.height = this.currentParams.pHeight;
          this.initialParams.width = this.initialParams.height * this.ratio;
        }
        break;
      case 'cover':
        this.initialParams.width = this.currentParams.pWidth;
        this.initialParams.height = this.initialParams.width / this.ratio;
        if (this.initialParams.height < this.currentParams.pHeight) {
          this.initialParams.height = this.currentParams.pHeight;
          this.initialParams.width = this.initialParams.height * this.ratio;
        }
        break;
      case 'natural':
        this.initialParams.width = Math.min(this.currentParams.pWidth, this.img.naturalWidth);
        this.initialParams.height = this.initialParams.width / this.ratio;
        if (this.initialParams.height > this.currentParams.pHeight) {
          this.initialParams.height = Math.min(this.currentParams.pHeight, this.img.naturalHeight);
          this.initialParams.width = this.initialParams.height * this.ratio;
        }
        break;
      case 'fit':
        this.initialParams.width = this.currentParams.pWidth;
        this.initialParams.height = this.initialParams.width / this.ratio;
        if (this.initialParams.height > this.currentParams.pHeight) {
          this.initialParams.height = this.currentParams.pHeight;
          this.initialParams.width = this.initialParams.height * this.ratio;
        }
        break;
    }
    this.currentParams = Object.assign({}, this.currentParams, {
      ...this.initialParams
    });
    this.placeImage();
    this.setImage(this.initialParams);
  }

  placeImage() {
    switch (this.initialPosition.top) {
      case 'center':
        this.initialParams.top = (this.currentParams.pHeight - this.currentParams.height) / 2;
        break;
      case 'bottom':
        this.initialParams.top = this.currentParams.pHeight - this.currentParams.height;
        break;
    }
    switch (this.initialPosition.left) {
      case 'center':
        this.initialParams.left = (this.currentParams.pWidth - this.currentParams.width) / 2;
        break;
      case 'right':
        this.initialParams.left = this.currentParams.pWidth - this.currentParams.width;
        break;
    }
  }

  getContainerPosition() {
    if (!this.currentParams.pLeft || !this.currentParams.pTop) {
      this.currentParams.pLeft = this.container.getBoundingClientRect().left;
      this.currentParams.pTop = this.container.getBoundingClientRect().top;
    }
    return {
      pLeft: this.currentParams.pLeft,
      pTop: this.currentParams.pTop
    }
  }

  onMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    this.previousCoords.x = e.pageX;
    this.previousCoords.y = e.pageY;
    this.mc.on("panmove", this.handlers.moveHandler = e => {
      this.onMouseMove(e.srcEvent);
      e.preventDefault();
    });
    this.mc.on("panend", this.handlers.removeHandler = e => {
      this.onMouseUp();
    });
    document.addEventListener("mouseleave", this.handlers.removeHandler = e => {
      this.onMouseUp();
    });
    e.preventDefault();
    e.stopPropagation();
  }

  private onMouseMove(e) {
    e.stopPropagation();
    e.preventDefault();
    this.moveAt(e);
  }

  private moveAt(e) {
    const maxDragX = this.currentParams.pWidth - this.currentParams.width;
    const maxDragY = this.currentParams.pHeight - this.currentParams.height;

    const newTop = Math.min(0, Math.max(this.currentParams.top + this.shift.y, maxDragY));
    const newLeft = Math.min(0, Math.max(this.currentParams.left + this.shift.x, maxDragX));
    this.shift = {
      x: e.pageX - this.previousCoords.x,
      y: e.pageY - this.previousCoords.y
    };
    this.setImage({ top: newTop, left: newLeft });
    this.previousCoords = { x: e.pageX, y: e.pageY };
  }

  private onMouseUp() {
    if (this.handlers.moveHandler) {
      this.mc.off('panmove', this.handlers.moveHandler);
    }
    if (this.handlers.removeHandler) {
      this.mc.off('panend', this.handlers.removeHandler);
      document.removeEventListener("mouseleave", this.handlers.removeHandler);
      this.handlers.removeHandler = null;
    }
  }
  @HostListener("wheel", ["$event"])
  onMouseWheel(e) {
    e.preventDefault();
    const x = e.pageX - this.getContainerPosition().pLeft;
    const y = e.pageY - this.getContainerPosition().pTop;
    if (e.deltaY > 0) {
      this.zoomCurrent += this.zoomStep;
    }
    else {
      this.zoomCurrent -= this.zoomStep;
    }
    this.zoomCurrent = Math.min(Math.max(this.zoomMin, this.zoomCurrent), this.zoomMax)
    this.zoom({ shift: e.deltaY, x, y });
  }
  zoomIn() {
    this.zoomCurrent += this.zoomStep;
    this.zoomCurrent = Math.min(Math.max(this.zoomMin, this.zoomCurrent), this.zoomMax)
    this.zoom({
      shift: 1
    })
  }
  zoomOut() {
    this.zoomCurrent -= this.zoomStep;
    this.zoomCurrent = Math.min(Math.max(this.zoomMin, this.zoomCurrent), this.zoomMax)
    this.zoom({
      shift: -1
    })
  }
  get canZoomIn() {
    return this.zoomCurrent < this.zoomMax;
  }
  get canZoomOut() {
    return this.zoomCurrent > this.zoomMin;
  }
  private zoom(zoomParams: ZoomParams) {
    zoomParams = Object.assign({
      x: this.currentParams.pWidth / 2,
      y: this.currentParams.pHeight / 2
    }, zoomParams);
    let params = this.getParams(zoomParams);
    this.setImage({
      width: params.newWidth,
      height: params.newHeight,
      top: params.imgPosY,
      left: params.imgPosX
    });
  }

  private getParams(zoomParams: ZoomParams) {
    let imgCursorX = zoomParams.x - this.currentParams.left,
      imgCursorY = zoomParams.y - this.currentParams.top,
      imgRX = imgCursorX / this.currentParams.width,
      imgRY = imgCursorY / this.currentParams.height,
      maxOffsetY,
      maxOffsetX,
      newWidth = null;

    if (zoomParams.shift > 0) {
    } else {
      maxOffsetY = this.initialParams.top;
      maxOffsetX = this.initialParams.left;
    }
    this.zoomCurrent = Math.min(Math.max(this.zoomMin, this.zoomCurrent), this.zoomMax)
    newWidth = this.initialParams.width * this.zoomCurrent;
    const newHeight = newWidth / this.ratio;
    const imgPosX = zoomParams.x - newWidth * imgRX;
    const imgPosY = zoomParams.y - newHeight * imgRY;

    const params = {
      newWidth: newWidth,
      newHeight: newHeight,
      imgPosX: imgPosX,
      imgPosY: imgPosY,
      maxOffsetX: maxOffsetX,
      maxOffsetY: maxOffsetY
    };
    this.checkPosition(params);
    return params;
  }

  private checkPosition(params: CheckParams) {
    const dhb = this.currentParams.pHeight - (params.newHeight + params.imgPosY);
    const dwb = this.currentParams.pWidth - (params.newWidth + params.imgPosX);
    if (dhb > 0 && dhb > params.maxOffsetY) params.imgPosY += dhb;
    if (dwb > 0 && dwb > params.maxOffsetX) params.imgPosX += dwb;
    if (params.imgPosY > 0) {
      params.imgPosY = 0;
    }
    if (params.imgPosX > 0) {
      params.imgPosX = 0;
    }
  }

  private setImage(imgParams: ImgParams) {
    this.width = imgParams.width || this.width;
    this.height = imgParams.height || this.height;
    const heightPrefix = this.currentParams.pHeight - this.height;
    const widthPrefix = this.currentParams.pWidth - this.width;

    this.top = this.height < this.currentParams.pHeight ? (heightPrefix) / 2 : Math.max(imgParams.top, heightPrefix);
    this.left = this.width < this.currentParams.pWidth ? (widthPrefix) / 2 : Math.max(imgParams.left, widthPrefix);
    // set current params
    this.currentParams.top = this.top;
    this.currentParams.left = this.left;
    this.currentParams.height = this.height;
    this.currentParams.width = this.width;
  }
  resetZoom() {
    this.zoomCurrent = this.zoomMin;
    this.setInitialParams();
  }

  @HostBinding('style.width.px') width: number;
  @HostBinding('style.height.px') height: number;
  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @HostBinding('style.position') position = 'absolute';

}
