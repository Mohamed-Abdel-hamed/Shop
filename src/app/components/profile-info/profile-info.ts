import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user/iuser';
import { AuthService } from '../../services/auth-service';
import { IProfile } from '../../models/user/iprofile';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.css',
})
export class ProfileInfo implements OnInit {
 user:IProfile|null=null;

  constructor(private authService: AuthService) {
}
ngOnInit() {
  this.getProfile();
}
getProfile(){
  this.authService.getProfile().subscribe({
    next:(profile)=>{
      this.user=profile;
    }
  })
}
}
