import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  @Input() user: any; // Input property to receive user data
  userId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.loadUser();
    });
  }

  loadUser(): void {
    // Here you would typically fetch the user data from a service
    // This is a placeholder example
    const users = [
      {
        id: 1,
        name: 'Hafssa El Omrani',
        email: 'leslie.alexander@gmail.com',
        image: '/assets/user/user-02.png',
        role: 'Admin System',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Yahya Saadaoui',
        email: 'yahya.saadaoui@gmail.com',
        image: '/assets/user/dev.png',
        role: 'Admin System',
        status: 'Active'
      },
      {
        id: 3,
        name: 'Ilyas El Omrani',
        email: 'leslie.alexander@gmail.com',
        image: '/assets/user/user-03.png',
        role: 'Admin',
        status: 'Active'
      }
    ];

    this.user = users.find(user => user.id === this.userId);
  }

  updateUser(): void {
    // Implement update logic here
    console.log('User updated:', this.user);
  }

  closeAddModal(): void {
    this.router.navigate(['/dashboard/user-management/list']); // Navigate back to the user list
  }
  // Method to handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Here you might want to handle the file, such as uploading it or displaying a preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result; // Set the image URL to the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a base64 URL
    }
  }
}
