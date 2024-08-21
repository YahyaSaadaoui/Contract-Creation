import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-creation',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './contract-creation.component.html',
  styleUrl: './contract-creation.component.css'
})
export class ContractCreationComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }
}
