import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public IngresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.IngresoEgresoService.initIngresoEgresoListener();
  }

}
