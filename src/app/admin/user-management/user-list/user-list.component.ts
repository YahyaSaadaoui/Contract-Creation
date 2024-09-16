import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  searchQuery: string = '';
  users = [
    {
      id:1,
      name: 'Hafssa El Omrani',
      email: 'leslie.alexander@gmail.com',
      image: '/assets/user/user-02.png',
      role:"Admin System",
      status:"Active"
    },
    {
      id:2,
      name: 'Yahya Saadaoui',
      email: 'yahya.saadaoui@gmail.com',
      image: '/assets/user/dev.png',
      role:"Admin System",
      status:"Active"
    }
    ,
    {
      id:3,
      name: 'Ilyas El Omrani',
      email: 'leslie.alexander@gmail.com',
      image: '/assets/user/user-03.png',
      role:"Admin",
      status:"Active"
    }
  ];
  filteredUsers() {
    if (!this.searchQuery.trim()) {
      return this.users;
    }
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  confirmDelete(userId: number) {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      this.deleteUser(userId);
    }
  }

  deleteUser(userId: number) {
    // Logic to delete the user
    this.users = this.users.filter(user => user.id !== userId);
    // Here you might also want to call a service to handle actual deletion from a server
    // this.userService.deleteUser(userId).subscribe(() => {
    //   this.users = this.users.filter(user => user.id !== userId);
    // });
  }
}
