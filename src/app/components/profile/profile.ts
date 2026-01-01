import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 isAdmin:boolean=false;
  constructor(private auth: AuthService ) {}
  ngOnInit(): void {
    const role = this.auth.getUserInfo()?.role;
    this.isAdmin = role === 'Admin';
  }
}
