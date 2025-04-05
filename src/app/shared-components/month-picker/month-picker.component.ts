import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { GraphSettings } from "../../utility-classes/graphsettings";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  standalone: true,
  styleUrls: ['./month-picker.component.scss'],
})
export class MonthPickerComponent implements OnInit, OnDestroy {
  currentDate: Date;
  currentMaxDate: Date;
  private graphSettingsSubscription: Subscription | undefined;

  constructor(private graphSettings: GraphSettings) {
    this.currentDate = new Date();
    this.currentMaxDate = new Date();
  }

  ngOnInit() {
    // Subscribe to graphSettings to update currentDate and currentMaxDate
    this.graphSettingsSubscription = this.graphSettings.graphSettings$.subscribe(settings => {
      this.currentDate = new Date(settings.selectedDate);
      this.currentMaxDate = new Date();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.graphSettingsSubscription) {
      this.graphSettingsSubscription.unsubscribe();
    }
  }

  get currentMonthYear(): string {
    return this.currentDate.toLocaleDateString('el-GR', { year: 'numeric', month: 'long' });
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(this.currentDate); // Ensure it is a new Date object
    this.graphSettings.updateGraphSettings({selectedDate:this.currentDate}); // Update the graphSettings
  }

  nextMonth(): void {
    if (this.hasNextMonth()) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate); // Ensure it is a new Date object
      this.graphSettings.updateGraphSettings({selectedDate:this.currentDate}); // Update the graphSettings
    }
  }

  // Function to check if there is a next month available
  hasNextMonth(): boolean {
    return (
      this.currentDate.getFullYear() < this.currentMaxDate.getFullYear() ||
      (this.currentDate.getFullYear() === this.currentMaxDate.getFullYear() &&
        this.currentDate.getMonth() < this.currentMaxDate.getMonth())
    );
  }
}
