import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(user: User) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.delete(user.id).subscribe(() => {
        this.toastr.success("User deleted successfully");
        this.fetchUsers();
      });
    }
  }
}
