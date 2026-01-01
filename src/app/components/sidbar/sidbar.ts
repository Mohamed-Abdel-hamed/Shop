import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidbar.html',
  styleUrl: './sidbar.css',
})
export class Sidbar {
  @Output() close = new EventEmitter<void>();
 @Input() isOpen:boolean=false
 isLogin=false;
 constructor(private authService:AuthService){
    authService. isLogin.subscribe({
    next:(status)=>{
this.isLogin=status;
    }
  })
 }
closeSideBar()
{
 this.isOpen=!this.isOpen
   this.close.emit();
}
logOut(){
  this.authService.logOut();
}
}
