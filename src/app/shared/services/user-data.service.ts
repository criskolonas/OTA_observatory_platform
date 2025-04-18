import {Injectable} from "@angular/core";

interface SessionDataType{
  username?:string
  shouldDisplayNav:boolean
}

@Injectable({
  providedIn: 'root',
})

export class UserDataService {
  get sessionData(): SessionDataType {
    return this._sessionData;
  }

  set sessionData(value: SessionDataType) {
    this._sessionData = value;
  }

  private _sessionData: SessionDataType

  constructor() {
    this._sessionData = {username:'',shouldDisplayNav: false}
  }
}

