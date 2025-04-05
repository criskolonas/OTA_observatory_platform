import {Component, Input, OnInit} from '@angular/core';
import {OtaVariableService} from "../shared/services/ota-variable.service";
import {OtaVariable} from "../shared/models/ota-variable";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ConfiscationsDetailsComponent} from "./confiscations-details/confiscations-details.component";
import {OtaVariableEnum} from "../shared/enums/ota-variable.enum";
import {AreaDetailsComponent} from "./area-details/area-details.component";
import {MortgageDetailsComponent} from "./mortgage-details/mortgage-details.component";
import {OwnerDetailsComponent} from "./owner-details/owner-details.component";
import {PropertiesDetailsComponent} from "./properties-details/properties-details.component";
import {PropertyDealingDetailsComponent} from "./property-dealing-details/property-dealing-details.component";
import {MonthPickerComponent} from "../shared-components/month-picker/month-picker.component";

@Component({
  selector: 'app-ota-feature-details',
  standalone: true,
  imports: [
    NgIf,
    ConfiscationsDetailsComponent,
    AreaDetailsComponent,
    MortgageDetailsComponent,
    OwnerDetailsComponent,
    PropertiesDetailsComponent,
    PropertyDealingDetailsComponent,
    MonthPickerComponent
  ],
  templateUrl: './ota-feature-details.component.html',
  styleUrl: './ota-feature-details.component.scss'
})
export class OtaFeatureDetailsComponent implements OnInit {
  @Input() id!: string;
  loading: boolean = false;
  otaVariable!: OtaVariable;

  constructor(
    private otaVariableService: OtaVariableService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadFeatureDetails();
  }

  loadFeatureDetails() {
    this.loading = true;
    this.otaVariableService.getOtaVariableDetails(Number.parseInt(this.id)).subscribe({
      next: (data: OtaVariable) => {
        this.otaVariable = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.router.navigate(['features'])
      }
    });
  }

  protected readonly OtaVariableEnum = OtaVariableEnum;
}
