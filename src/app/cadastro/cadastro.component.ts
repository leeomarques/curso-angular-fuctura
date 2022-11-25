import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  
  formularioCadastro!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.iniciarFormulario();
  }

  createNewTask() {
    console.log(this.formularioCadastro.value);
  }

  ngOnInit(): void {}

  private iniciarFormulario(): void {
    this.formularioCadastro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log('este');
  }
}
