import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from '../enums/role.enum';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() user: any; //input untuk edit, null untuk tambah
  userForm: FormGroup;
  isEditMode: boolean = false;
  userRoles = UserRole;
  userRoleKeys: string[];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.user ? true : false;

    // Mengambil keys dari enum untuk dropdown
    this.userRoleKeys = Object.keys(this.userRoles).filter(key => isNaN(Number(key)));

    this.userForm = this.fb.group({
      user_id: [this.user ? this.user.user_id : null],
      user_name: [this.user ? this.user.user_name : '', Validators.required],
      email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
      phone: [this.user ? this.user.phone : '', Validators.required],
      role: [this.user ? this.user.role : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    if (this.isEditMode) {
      // Update user
      this.userService.updateUser(userData).subscribe(
        response => {
          console.log(response.message);
          this.activeModal.close('updated');
        },
        error => {
          console.error('Gagal memperbarui user:', error);
        }
      );
    } else {
      // Tambah user
      this.userService.addUserModal(userData).subscribe(
        response => {
          console.log(response.message);
          this.activeModal.close('added');
        },
        error => {
          console.error('Gagal menambah user:', error);
        }
      );
    }
  }

  onCancel() {
    this.activeModal.dismiss('cancel');
  }

}
