import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesStatsService} from "../../shared/services/properties-stats.service";
import {PropertiesPerMonth} from "../../shared/models/stats/properties-per-month";
import {ChartModule} from "primeng/chart";
import {GraphSettings} from "../../utility-classes/graphsettings";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-properties-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './properties-details.component.html',
  styleUrl: './properties-details.component.scss'
})
export class PropertiesDetailsComponent implements OnInit,OnDestroy{
  basicData: any;

  basicOptions: any;
  monthDate: string = '';
  private graphSettingsSubscription: Subscription | undefined;

  constructor(
    private propertiesStatsService: PropertiesStatsService,    private graphSettings: GraphSettings

  ) {}

  ngOnInit() {
    // Subscribe to the graphSettings observable
    this.graphSettingsSubscription = this.graphSettings.graphSettings$.subscribe({
      next: (settings) => {
        this.initializePropertyPerPrefectureDiagram(settings.selectedDate);
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

  initializePropertyPerPrefectureDiagram(date: Date) {
    this.propertiesStatsService.getPropertiesByPrefecturePerMonth(date).subscribe({
      next: (data: PropertiesPerMonth) => {
        this.initializeDiagram(data);
      }
    })
  }


  initializeDiagram(data: PropertiesPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: data.propertiesByPrefecture.map(d => d.prefectureName),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Πληθός Οριζόντιων Ιδιοκτησιών',
          data: data.propertiesByPrefecture.map(d => d.totalProperties),
          // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          // borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
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
            text: 'Πλήθος Οριζόντιων Ιδιοκτησιών',
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
