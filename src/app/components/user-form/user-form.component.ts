import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import Utils from '../../utils'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  errros: [];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
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

  getError(field: string) {
    return Utils.getError(this.errros, field);
  }

  onSubmit() {
    if(this.id) {
      this.userService.update(this.user).subscribe({
        next: () => {
          this.toastr.success("User Update successfully");
          this.gotoUserList();
        },
        error: err => {
          if (err.status === 422) {
            this.errros = err.error.fieldErrors;
          }
        }
      });
    } else {
      this.userService.save(this.user).subscribe({
        next: () => {
          this.toastr.success("User created successfully");
          this.gotoUserList();
        },
        error: err => {
          if (err.status === 422) {
            this.errros = err.error.fieldErrors;
          }
        }
      });
    }
  }

  gotoUserList() {
    this.router.navigate(['/']);
  }

}
