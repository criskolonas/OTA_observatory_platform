import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {MortgagesStatsService} from "../../shared/services/mortgages-stats.service";
import {MortgagesPerMonth} from "../../shared/models/stats/mortgages-per-month";
import {Subscription} from "rxjs";
import {GraphSettings} from "../../utility-classes/graphsettings";

@Component({
  selector: 'app-mortgage-details',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './mortgage-details.component.html',
  styleUrl: './mortgage-details.component.scss'
})
export class MortgageDetailsComponent implements OnInit,OnDestroy{
  basicData: any;

  basicOptions: any;
  monthDate: string = '';
  private graphSettingsSubscription: Subscription | undefined;

  constructor(
    private mortgagesStatsService: MortgagesStatsService,    private graphSettings: GraphSettings

  ) {}

  ngOnInit() {
    // Subscribe to the graphSettings observable
    this.graphSettingsSubscription = this.graphSettings.graphSettings$.subscribe({
      next: (settings) => {
        this.initializeMortgagePerPrefectureDiagram(settings.selectedDate);
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

  initializeMortgagePerPrefectureDiagram(date: Date) {
    this.mortgagesStatsService.getConfiscationsByPrefecturePerMonth(date).subscribe({
      next: (data: MortgagesPerMonth) => {
        this.initializeDiagram(data);
      }
    })
  }


  initializeDiagram(data: MortgagesPerMonth) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: data.mortgagesByPrefecture.map(d => d.prefectureName),// ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Πλήθος Υποθηκών - Νομός',
          data: data.mortgagesByPrefecture.map(d => d.totalMortgages),
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
            text: 'Πλήθος Υποθηκών',
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
