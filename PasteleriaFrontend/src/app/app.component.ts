import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "./services/master-url.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _http: Http, private _masterURL: MasterUrlService) {
    console.log("Inicio el constructor");
  }
  ngOnInit() {
  }
}
