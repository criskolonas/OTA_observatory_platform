import { Injectable, Signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataReqType } from '../../admin-panel/admin-panel.component';
import { User, UserDataTableType } from '../interfaces/UserFormInterface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'api/admin/all-users', {
      withCredentials: true,
    });
  }

  postUserPermissions(
    updatedUsers: UserDataTableType[],
  ): Observable<UserDataReqType[]> {
    const payload = updatedUsers.map((user) => ({
      email: user.email,
      isAdmin: user.isAdmin,
    }));

    return this.http.post<UserDataReqType[]>(
      this.apiUrl + 'api/admin/change-permissions',
      payload,
      {
        withCredentials: true,
      },
    );
  }
}
