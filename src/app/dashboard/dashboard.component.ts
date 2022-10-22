import { Component, OnInit } from '@angular/core';

export interface tabela {
  data: string;
  Descricao: string;
  valor: number;
  tipo: string;
  fixo: string;
}

const ELEMENT_DATA: tabela[] = [
  {data: '10/10/2010', Descricao: 'informação de decrição', valor: 1500, tipo: 'Geral', fixo: 'S'},
  {data: '10/10/2010', Descricao: 'informação de decrição', valor: 1500, tipo: 'Geral', fixo: 'S'},
  {data: '10/10/2010', Descricao: 'informação de decrição', valor: 1500, tipo: 'Geral', fixo: 'S'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['data', 'Descricao', 'valor', 'tipo', 'fixo'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
