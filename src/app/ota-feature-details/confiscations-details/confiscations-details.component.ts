import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {ConfiscationsStatsService} from "../../shared/services/confiscations-stats.service";
import {ConfiscationsPerMonth} from "../../shared/models/stats/confiscations-per-month";
import {GraphSettings} from "../../utility-classes/graphsettings";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-confiscations-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './confiscations-details.component.html',
  styleUrl: './confiscations-details.component.scss'
})
export class ConfiscationsDetailsComponent implements OnInit,OnDestroy {

  basicData: any;
  basicOptions: any;
  monthDate: string = ''; // Property to hold the formatted month date
  private graphSettingsSubscription: Subscription | undefined;

  constructor(
    private confiscationsStatsService: ConfiscationsStatsService,
    private graphSettings: GraphSettings
  ) {}

  ngOnInit() {
    // Subscribe to the graphSettings observable
    this.graphSettingsSubscription = this.graphSettings.graphSettings$.subscribe({
      next: (settings) => {
        this.initializeConfiscationPerPrefectureDiagram(settings.selectedDate);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.graphSettingsSubscription) {
      this.graphSettings.updateGraphSettings({selectedDate:new Date()});
      this.graphSettingsSubscription.unsubscribe();
    }
  }

  initializeConfiscationPerPrefectureDiagram(date: Date) {
    this.confiscationsStatsService.getConfiscationsByPrefecturePerMonth(date).subscribe({
      next: (data: ConfiscationsPerMonth) => {
        this.initializeDiagram(data);
      }
    });
  }

  initializeDiagram(data: ConfiscationsPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: data.confiscationsByPrefecture.map(d => d.prefectureName),
      datasets: [
        {
          label: 'Πλήθος Κατασχέσεων - Νομός',
          data: data.confiscationsByPrefecture.map(d => d.totalConfiscations),
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          title: {
            display: true,
            text: 'Πλήθος Κατασχέσεων',
            color: textColor
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          title: {
            display: true,
            text: 'Νομός',
            color: textColor
          }
        }
      }
    };
  }

}
