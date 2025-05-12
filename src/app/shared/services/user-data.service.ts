import { Injectable } from '@angular/core';

interface SessionDataType {
  username: string;
  shouldDisplayNav: boolean;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  get sessionData(): SessionDataType | null {
    return this._sessionData;
  }

  set sessionData(value: SessionDataType | null) {
    this._sessionData = value;
  }

  private _sessionData: SessionDataType | null;

  constructor() {
    this._sessionData = null;
  }
}
