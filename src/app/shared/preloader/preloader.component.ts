// preloader.component.ts
import { Component, OnInit } from '@angular/core';
import { PreloaderService } from './preloader.service';
import {NgIf} from "@angular/common";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  showPreloader = true; // Initially show the preloader

  constructor(private preloaderService: PreloaderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.preloaderService.showPreloader$.subscribe(value => {
      this.showPreloader = value;
      this.cdr.detectChanges(); // Force re-render
    });
  }
}
