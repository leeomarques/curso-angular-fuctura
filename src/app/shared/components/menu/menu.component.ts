import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  onLogin(): void {
    this.router.navigate(['login']);
  }
  onDespesas(): void {
    this.router.navigate(['lancamentos/despesas']);
  }
  onReceitas(): void {
    this.router.navigate(['lancamentos/receitas']);
  }
  onDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  ngOnInit(): void {}
}
