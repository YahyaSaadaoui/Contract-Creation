import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var jsVectorMap: any; // Declare jsVectorMap

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    // ... any other initialization logic you might have
  }

  ngAfterViewInit() {
    // Initialize the map after the view has been initialized
    new jsVectorMap({
      map: 'world', // or 'africa'
      selector: '#mapOne',
      // ... other jsVectorMap options for customization
    });
  }
}
