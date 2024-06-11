import { Component, OnInit } from '@angular/core';

import { latLng, tileLayer, circle, polygon, marker, icon, Layer, map, layerGroup, control } from 'leaflet';

import * as L from 'leaflet';
@Component({
    selector: 'app-empleado',
    templateUrl: './empleado.component.html',
    styleUrls: ['./empleado.component.scss']
})

export class EmpleadoComponent implements OnInit {

    // bread crumb items
    breadCrumbItems!: Array<{}>;
    map!: L.Map;
    icon= icon({
      iconSize: [35,45],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      iconUrl: 'assets/images/Map_pin_icon.svg '
    })

    osm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });
    osmHOT = tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });
    field1 = marker([-17.40381817111344, -66.28930478415137],{icon:this.icon}).bindPopup("<b>Hello world!</b><br />I am a popup.");
    field3 = marker([-17.409120351402102, -66.27165325606147],{icon:this.icon}).bindPopup('This is Denver, CO.');
    field4 = marker([-17.394711608475966, -66.27635356049272],{icon:this.icon}).bindPopup('This is Aurora, CO.');
    field2 = marker([-17.390796137772043, -66.27527080571122],{icon:this.icon}).bindPopup('This is Golden, CO.');
    
    // list = L.layerGroup([this.field1 , this.field2, this.field3, this.field4]);
 
  GroupsLayers = [this.field1 , this.field2, this.field3, this.field4];
    constructor() {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: 'Dashboards' },
            { label: 'Enpleado', active: true }
        ];   
        
        this.initMap();
      }
    
      private initMap(): void {
        this.map = L.map('map', {
          center: [39, -100],
          zoom: 3
        });
      
      }
  /**
* Basic Maps
*/
options = {  
  // layers: [this.osm, this.osmHOT],
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 13,
    center: latLng(-17.379564334907542, -66.28315805967586)
  };

  cities = layerGroup([this.field1, this.field2, this.field3, this.field4]);

  baseMaps = {
    "OpenStreetMap": this.osm,
    "OpenStreetMap.HOT": this.osmHOT
  };

  overlayMaps = {
      "Cities": this.cities
  };

  // map = map('map', {
  //   center: [39.73, -104.99],
  //   zoom: 10,
  //   layers: [this.osm, this.cities]
  // });
  // layerControl = control.layers(this.baseMaps, this.overlayMaps).addTo(this.map);


  popupLayers = [
    circle([51.508, -0.11], { color: "#f06548", fillColor: "#f06548", radius: 500 }).bindPopup("I am a circle."),
    polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047],], { color: "#405189", fillColor: "#405189" }).bindPopup("I am a polygon."),
    marker([51.5, -0.09]).bindPopup("<b>Hello world!</b><br />I am a popup.")
  ];
}
