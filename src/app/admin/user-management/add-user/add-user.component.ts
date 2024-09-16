import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  newUser = {
    name: '',
    email: '',
    image: '',
    role: '',
    status: ''
  };

  // Method to handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newUser.image = e.target.result; // Set the image URL to the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a base64 URL
    }
  }

  addUser() {
    // Add user logic here
    // You can handle adding user by sending `newUser` object to a service or performing other actions
    console.log('New User Added:', this.newUser);
  }

  closeAddModal() {
    this.router.navigate(['/dashboard/user-management/list']);
  }
}
