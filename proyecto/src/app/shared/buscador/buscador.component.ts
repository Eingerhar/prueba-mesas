import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  constructor() {}
  condicion: string = 'vista_mesas_qr';

  active: boolean = false;

  con = 0;
  ngOnInit(): void {}

  contador(condicion) {
    if (condicion == true) {
      this.con++;
    } else {
      this.con--;
    }
  }
}
