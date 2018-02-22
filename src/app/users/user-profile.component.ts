import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentProfile: any;

  constructor(private authService:AuthService) { }

  ngOnInit() {
      this.authService.currentProfile.subscribe(profile => {
        this.currentProfile = profile;
      });
    }

}