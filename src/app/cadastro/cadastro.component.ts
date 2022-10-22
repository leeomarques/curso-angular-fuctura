import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(fb: FormBuilder) {
    this.formulario = fb.group({
      name: ["", Validators.required]
  });
  }

  createNewTask()
  {
      console.log(this.formulario.value)
  }

  ngOnInit(): void {
  }



}
