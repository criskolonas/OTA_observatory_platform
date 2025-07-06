import { Component, OnInit, Signal, signal } from '@angular/core';
import {
  ColumnDef,
  DatatableComponent,
} from '../shared-components/datatable/datatable.component';
import { UsersService } from '../shared/services/users-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../shared/services/toast.service';
import { LoginService } from '../shared/services/login-service';

export interface UserDataTableType {
  username: string;
  email: string;
  created_at: string;
  is_admin: boolean;
}

export type UserDataReqType = Pick<UserDataTableType, 'email' | 'is_admin'>;

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  userColumns: ColumnDef<UserDataTableType>[] = [
    {
      header: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      header: 'Email',
      name: 'email',
      type: 'text',
    },
    {
      header: 'Created at',
      name: 'created_at',
      type: 'text',
    },
    {
      header: 'Admin',
      name: 'is_admin',
      type: 'checkbox',
    },
  ];

  userData = signal<UserDataTableType[]>([]);

  constructor(
    private usersService: UsersService,
    private ls: LoginService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.userData.set(res);
      },
      error: (err: HttpErrorResponse) => {
        this.toast.showToast(err.error);
      },
    });
  }

  handleTablePost = (data: Signal<UserDataTableType[]>): void => {
    this.usersService.postUserPermissions(data()).subscribe({
      next: (res) => {
        this.toast.showToast('Τα δεδομένα ενημερώθηκαν.', true);
      },
      error: (err: HttpErrorResponse) => {
        this.toast.showToast(err.error);
      },
    });
  };
}
