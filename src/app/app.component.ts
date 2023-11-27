import {Component} from '@angular/core';
import {Product} from "./models/prduct.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true



  onLoaded(e: string) {
    console.log('Image Loaded -Padre-', e)
  }
  toogleImg(){
    this.showImage = !this.showImage
  }

}
