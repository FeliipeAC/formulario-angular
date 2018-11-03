import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

/**
*
*/
export class DadosRequest {
  dadosPessoais: DadosPessoais;
  requestType: any = '';
  text = '';
}

/**
*
*/
export class DadosPessoais {
  nome = '';
  email = '';
  cep = '';
  rua = '';
  numero: number = null;
  complemento = '';
  estado = '';
  cidade = '';
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  
})
export class FormComponent implements OnInit {
  
  dadosForm: FormGroup;
  exibiload = false;
  checkForm = false;
  estados: any[];
  maskTelefone: string;
  maskTelefone2: string;
  maskCpf: string;
  
  constructor() {
      
      this.dadosForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
        cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
        telefone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        telefone2: new FormControl(),
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        complemento: new FormControl(),
        estado: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        termos_de_uso: new FormControl('', Validators.required)
      });
      
      this.estados = [
        {'nome': 'Acre', 'sigla': 'AC'},
        {'nome': 'Alagoas', 'sigla': 'AL'},
        {'nome': 'Amapá', 'sigla': 'AP'},
        {'nome': 'Amazonas', 'sigla': 'AM'},
        {'nome': 'Bahia', 'sigla': 'BA'},
        {'nome': 'Ceará', 'sigla': 'CE'},
        {'nome': 'Distrito Federal', 'sigla': 'DF'},
        {'nome': 'Espírito Santo', 'sigla': 'ES'},
        {'nome': 'Goiás', 'sigla': 'GO'},
        {'nome': 'Maranhão', 'sigla': 'MA'},
        {'nome': 'Mato Grosso', 'sigla': 'MT'},
        {'nome': 'Mato Grosso do Sul', 'sigla': 'MS'},
        {'nome': 'Minas Gerais', 'sigla': 'MG'},
        {'nome': 'Pará', 'sigla': 'PA'},
        {'nome': 'Paraíba', 'sigla': 'PB'},
        {'nome': 'Paraná', 'sigla': 'PR'},
        {'nome': 'Pernambuco', 'sigla': 'PE'},
        {'nome': 'Piauí', 'sigla': 'PI'},
        {'nome': 'Rio de Janeiro', 'sigla': 'RJ'},
        {'nome': 'Rio Grande do Norte', 'sigla': 'RN'},
        {'nome': 'Rio Grande do Sul', 'sigla': 'RS'},
        {'nome': 'Rondônia', 'sigla': 'RO'},
        {'nome': 'Roraima', 'sigla': 'RR'},
        {'nome': 'Santa Catarina', 'sigla': 'SC'},
        {'nome': 'São Paulo', 'sigla': 'SP'},
        {'nome': 'Sergipe', 'sigla': 'SE'},
        {'nome': 'Tocantins', 'sigla': 'TO'}
      ];
      
      this.maskTelefone = this.maskTelefone2 = '(00) 0000-00000';
      this.maskCpf = '000.000.000-00';
      // const dados = JSON.parse(sessionStorage.getItem('dadosPessoais'));
      // if (dados) {
      //   this.valores(dados);
      // }
    }
    
    ngOnInit() {
    }
    
    /**
    * Verifica a quantidade de dígitos para exibir a máscara do cpf
    */
    contaCpf(val: number, campo: string) {
      if (campo === 'cpf') {
        this.maskCpf = (val === 11) && '000.000.000-00';
      }
    }
    
    validaCpf(cpf: string) {
      let soma = 0;
      let resto = 0;
      if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222') || (cpf === '33333333333') ||
      (cpf === '4444444444') || (cpf === '55555555555') || (cpf === '66666666666') || (cpf === '77777777777') ||
      (cpf === '88888888888') || (cpf === '99999999999')) {
        
      } else {
        
        for (let i = 1; i <= 9; i++)  {
          const aux = (parseInt(cpf.substring(i - 1, i), 10)) * (11 - i);
          soma += Math.round(aux);
        }
        resto = (soma * 10) % 11;
        
        if ((resto === 10) || (resto === 11)) {
          resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(9), 10)) {
          console.log('False');
        }
        
        soma = 0;
        for (let j = 1; j <= 10; j++) {
          const aux = (parseInt(cpf.substring(j - 1, j), 10)) * (12 - j);
          soma += Math.round(aux);
        }
        resto = (soma * 10) % 11;
        
        if ((resto === 10) || (resto === 11)) {
          resto = 0;
        }
        // console.log('Resto: ', resto);
        // console.log('Teste: ', parseInt(cpf.substring(10, 11)));
        if (resto !== parseInt(cpf.charAt(10), 10)) {
          console.log('False');
        }
        // console.log('True');
      }
      
    }
    /**
    * Insere dados já preenchidos anteriormente no formulário
    * @param dados
    */
    valores(dados) {
      if (dados) {
        this.dadosForm.controls['nome'].setValue(dados.nome);
        this.dadosForm.controls['email'].setValue(dados.email);
        this.dadosForm.controls['telefone'].setValue(dados.telefone);
        this.dadosForm.controls['telefone2'].setValue(dados.telefone2);
        this.dadosForm.controls['cep'].setValue(dados.cep);
        this.dadosForm.controls['rua'].setValue(dados.rua);
        this.dadosForm.controls['numero'].setValue(dados.numero);
        this.dadosForm.controls['complemento'].setValue(dados.complemento);
        this.dadosForm.controls['estado'].setValue(dados.estado);
        this.dadosForm.controls['cidade'].setValue(dados.cidade);
      }
    }
  }
  