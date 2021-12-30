import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.userService.findById(this.id).subscribe(
        user => this.user = user
      );
    }
  }

  onSubmit() {
    if(this.id) {
      this.userService.update(this.user).subscribe(result => this.gotoUserList());
    } else {
      this.userService.save(this.user).subscribe(result => this.gotoUserList());
    }
  }

  gotoUserList() {
    this.router.navigate(['/']);
  }

}
