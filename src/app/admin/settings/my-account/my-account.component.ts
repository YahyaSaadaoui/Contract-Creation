import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  selectedFile: File | null = null;
  profileImageUrl: string | null = null; // Add this line

  constructor(private userService: UserService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(userId: number) {
    if (this.selectedFile) {
      this.userService.uploadProfilePicture(userId, this.selectedFile)
        .subscribe(response => {
          console.log('Image URL:', response);
          this.profileImageUrl = response; // Update the profile image URL
        }, error => {
          console.error('Error uploading image:', error);
        });
    }
  }
}
