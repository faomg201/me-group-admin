import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {
  lat: number =14.903574368823824;
  lng: number =102.05638331433778;


  constructor() { }

  ngOnInit(): void {
    
    let loader = new Loader({
      apiKey:'AIzaSyDthza5S-EaCVM_uzu3ty8GsCTqEje_XdY'
    })

    loader.load().then(()=>{
      const myLatLng = { lat: 14.903574368823824, lng: 102.05638331433778 };
      const map = new google.maps.Map(document.getElementById("map")!,{
        zoom:14,
        center: myLatLng
      })
      
      new google.maps.Marker({
        position: myLatLng,
        map,
      });
    })
  }





}
