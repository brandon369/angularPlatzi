import {Component, OnInit} from '@angular/core';
import {UsersService} from "./services/users.service";
import {AuthService} from "./services/auth.service";
import {switchMap} from "rxjs/operators";
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true
  token = ''

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(){
    const token = this.tokenService.getToken()
    if(token){
      this.authService.profile().subscribe()
    }
  }

  // onLoaded(e: string) {
  //   console.log('Image Loaded -Padre-', e)
  // }
  //
  // toogleImg() {
  //   this.showImage = !this.showImage
  // }

  createUser() {
    this.userService.create({name: 'hola c', email: 'h@mail.com', password: '123asdf123', avatar: 'https://imgur.com/R2PN9Wq'})
      .subscribe(rta => {
        console.log(rta)
      })
  }

  login() {
    this.authService.login('h@mail.com', '123asdf123')
      .subscribe(rta => {
        this.token = rta.access_token
      })
  }

  getProfile() {
    this.authService.profile().subscribe(rta => {
      console.log(rta)
    })
  }


  loginAndGetProfile(){
    this.authService.login('h@mail.com', '123')
      .pipe(
        switchMap(rta => this.authService.profile())
      )
      .subscribe(rta => {
        console.log(rta)
      })

  }

}
