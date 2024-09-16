import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-business-settings',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './business-settings.component.html',
  styleUrl: './business-settings.component.css'
})
export class BusinessSettingsComponent {

}
