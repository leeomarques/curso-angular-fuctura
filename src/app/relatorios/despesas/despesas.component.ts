import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuTypeEnum } from 'src/app/shared/emuns/menu-type.enum';
import { LancamentosService } from 'src/app/shared/services/lancamentos.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import Swal from 'sweetalert2';

import { IDespesa } from '../../shared/models/despesa.interface';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css'],
})
export class DespesasComponent implements OnInit {
  dataSourceDespesas: IDespesa[] = [];
  private dataSourceDespesasOriginal: IDespesa[] = [];
  displayedColumns = ['data', 'valor', 'tipo', 'fixo', 'descricao', 'acoes'];
  filtro!: FormGroup;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private lancamentosService: LancamentosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listDespesas();
    this.initform();
    this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
  }

  private initform(): void {
    this.filtro = this.formBuilder.group({
      dataPicker: '',
    });
  }

  private listDespesas(): void {
    this.lancamentosService.listaDespesas().subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          const lancamentos = resp.body;
          if (lancamentos && lancamentos.length > 0) {
            this.dataSourceDespesas = lancamentos
              // filtrar as despesas
              .filter((l) => l.ehReceita === false)
              // transforma o lancamento em despesa
              .map((lancamento) => {
                const despesa: IDespesa = {
                  data: lancamento.data,
                  descricao: lancamento.descricao,
                  ehFixo: lancamento.ehFixo,
                  tipo: lancamento.tipo,
                  valor: lancamento.valor,
                  id: lancamento.id,
                };
                return despesa;
              });
            this.dataSourceDespesasOriginal = this.dataSourceDespesas;
          }
        }
      },
    });
  }

  onEditDespesa(despesa: IDespesa) {
    this.lancamentosService.despesaSelecionada = despesa;
    this.lancamentosService.modoEdicao = true;
    this.router.navigate(['lancamentos/despesas']);
  }

  onRemoveDespesa(despesa: IDespesa) {
    Swal.fire({
      title: 'Remover Despesa',
      text:
        'Deseja remover a despesa "' + despesa.descricao.toUpperCase() + '" ?',
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      // Se confirmar remover
      if (result.isConfirmed) {
        this.removeDespesa(despesa);
      }
    });
  }

  private removeDespesa(despesa: IDespesa): void {
    this.lancamentosService.removerDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok) {
          // atualizar a listagem
          this.listDespesas();
          // mensagem
          Swal.fire('Removido!', 'Despesa removido com sucesso.', 'success');
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status < 500) {
          Swal.fire('Erro ao remover a Despesa', err.error.mensagem, 'warning');
        } else {
          Swal.fire('Erro inespesado', err.error.mensagem, 'error');
        }
      },
    });
  }

  onSearch(): void {
    const { dataPicker } = this.filtro.value;

    // console.log('dt', dataPicker.format('yyyy-MM-DD'));
    // console.log('despesa', this.dataSourceDespesasOriginal[0].data);
    this.dataSourceDespesas = this.dataSourceDespesasOriginal.filter(
      (despesa) => despesa.data === dataPicker.format('yyyy-MM-DD')
    );
  }
}
