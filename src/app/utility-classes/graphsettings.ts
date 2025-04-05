import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface GraphSettingsInterface {
  selectedDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class GraphSettings {
  private graphSettingsSubject = new BehaviorSubject<GraphSettingsInterface>({
    selectedDate: new Date(),
    });

  // Observable to subscribe to changes
  graphSettings$ = this.graphSettingsSubject.asObservable();

  constructor() {}

  // Method to update graphSettings
  updateGraphSettings(newSettings: GraphSettingsInterface) {
    this.graphSettingsSubject.next(newSettings);
  }
}
