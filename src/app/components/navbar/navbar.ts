import { Component, HostAttributeToken, HostListener, Input, NgModule, OnInit } from '@angular/core';
import { Sidbar } from "../sidbar/sidbar";
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Inavitem } from '../../models/inavitem';

@Component({
  selector: 'app-navbar',
  imports: [Sidbar, FormsModule, RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isMobile = false;
  isMedium=false;
  isXSmale=false
isOpenSideBar:boolean=false;
isDropDownProfile:boolean=false;
isLogin=false;

constructor(private _authService:AuthService)
{
  _authService. isLogin.subscribe({
    next:(status)=>{
this.isLogin=status;
    }
  })
}
ngOnInit() {
  this.updateScreenSize();

  window.onresize = () => this.updateScreenSize();
}

updateScreenSize() {
  const width = window.innerWidth;
  this.isXSmale=width<380
  this.isMobile = width < 768;
  this.isMedium = width >= 768 && width < 992;

}

openSideBar(){
 this.isOpenSideBar=!this.isOpenSideBar
}
toggleDropDownProfile(){
this.isDropDownProfile=!this.isDropDownProfile
}
@HostListener('document:click',['$event']) onClickOutside(event:Event)

{
const target=event.target as HTMLElement;

if(!target.closest('.dropdown-profile'))
{
  this.isDropDownProfile=false;
}
}
logOut(){
  this._authService.logOut();
}
}
