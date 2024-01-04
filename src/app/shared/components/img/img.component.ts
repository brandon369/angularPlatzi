import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = ''

  @Input('img')
  set changeimg(newImage: string) {
    this.img = newImage
    console.log('change just image')
  }


  @Output() loaded = new EventEmitter<string>()

  imageDedaul: string = './assets/images/default.png'

  counter = 0

  counterFn: number | undefined;

  constructor() {
    console.log('Consttuctor', 'img =>', this.img)
  }


  ngOnInit(): void {
    console.log('Init', 'img =>', this.img)
    // this.counterFn = setInterval(() => {
    //   this.counter += 1
    //   console.log('counter')
    // }, 1000)

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChange', 'img =>', this.img)
    console.log(changes)

  }

  ngAfterViewInit() {
    console.log('After view Init')
  }

  ngOnDestroy() {
    console.log('OnDestroy')
    // clearInterval(this.counterFn)
  }

  imgError() {
    this.img = this.imageDedaul
  }

  imgLoad() {
    console.log('load img')
    this.loaded.emit(this.img)
  }

}
