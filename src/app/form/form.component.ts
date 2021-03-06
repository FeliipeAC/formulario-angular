import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Subscribe } from '../model/subscribe.model';
import {animate, style, transition, trigger} from '@angular/animations';
import 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import {ComponentType} from '@angular/cdk/portal';
import { ModalConfirmComponent } from '../shared/modal/modal-confirm/modal-confirm.component';
import { Router } from '@angular/router';

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
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity: 0}),
      animate(250, style({opacity: 1}))
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
    animate(250, style({opacity: 0}))
  ])
])
]

})
export class FormComponent implements OnInit {
  
  dadosForm: FormGroup;
  exibiload = false;
  checkForm = false;
  estados: any[];
  maskTelefone: string;
  maskTelefone2: string;
  maskCpf: string;
  subcribers;
  checkCpf = false;
  component: ComponentType<any>;
  
  constructor(public snackBar: MatSnackBar,
    private cepService: ConsultaCepService,
    private modal: NgbModal,
    private route: Router) {
      
      this.dadosForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        cpf: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), FormComponent.validaCpf]),
        telefone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        telefone2: new FormControl(),
        cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
        bairro: new FormControl('', [Validators.required]),
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
      
    }
    
    ngOnInit() {
    }
    
    openModal() {
      this.modal.open(ModalConfirmComponent).result.then(result => {
        if (result === 1) {
          this.route.navigateByUrl("/subscribers");
        }
      });
    }
    
    /**
    * Verifica a quantidade de dígitos para exibir a máscara do telefone
    */
    contaCaracter(val: number, campo: string) {
      if (campo === 'telefone') {
        this.maskTelefone = (val < 14) && '(00) 0000-00000' || '(00) 00000-0000';
      } else {
        this.maskTelefone2 = (val < 14) && '(00) 0000-00000' || '(00) 00000-0000';
      }
    }
    
    /**
    * Verifica a quantidade de dígitos para exibir a máscara do cpf
    */
    contaCpf(val: number, campo: string) {
      if (campo === 'cpf') {
        this.maskCpf = (val === 11) && '000.000.000-00';
      }
    }
    
    /**
    * Verificar se o CPF é válido
    * @param control - FormControl do campo CPF
    */
    static validaCpf(control: FormControl) {
      const cpf = control.value;
      
      /**
      * Verifica se o CPF é algum caso trivial
      */
      const valida = () => {
        let soma = 0;
        let resto = 0;
        
        if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222') || (cpf === '33333333333') ||
        (cpf === '4444444444') || (cpf === '55555555555') || (cpf === '66666666666') || (cpf === '77777777777') ||
        (cpf === '88888888888') || (cpf === '99999999999') || (cpf === '')) {
          
          // Inválido
          return false;
        } else {
          
          /**
          * Validação para o primeiro dígito verificador
          */
          for (let i = 1; i <= 9; i++)  {
            const aux = (parseInt(cpf.substring(i - 1, i), 10)) * (11 - i);
            soma += Math.round(aux);
          }
          resto = (soma * 10) % 11;
          
          if ((resto === 10) || (resto === 11)) {
            resto = 0;
          }
          
          // Valida primeiro digito
          if (resto !== parseInt(cpf.charAt(9), 10)) {
            
            // Inválido
            return false;
          }
          soma = 0;
          
          /**
          * Verificação para o segundo dígito verificador
          */
          for (let j = 1; j <= 10; j++) {
            const aux = (parseInt(cpf.substring(j - 1, j), 10)) * (12 - j);
            soma += Math.round(aux);
          }
          resto = (soma * 10) % 11;
          
          if ((resto === 10) || (resto === 11)) {
            resto = 0;
          }
          
          // Valida segundo dígito
          if (resto !== parseInt(cpf.charAt(10), 10)) {
            
            // Inválido
            return false;
          }
          
          // Se cpf for válido
          return true;
        }
      }
      
      // Retorno do Validator do CPF
      return valida() ? null : { cpfInvalido: true};
      
    }
    
    /**
    * Consulta o CEP e obtém os dados do endreço
    */
    consultaCep() {
      
      // Pega o valor do campo CEP
      let cep = this.dadosForm.get('cep').value;
      let dadosCep = null;
      // Pega os dados do endereço pelo CEP no WebService
      this.cepService.consultaCep(cep)
      .subscribe(dados => {
        this.preencheDados(dados);
      });
      
      
    }
    
    
    /**
    * Preenche os campos de endereço obtido através do CEP
    * @param dados - dados do endereço
    */
    preencheDados(dados) {
      console.log('Dados cep: ', dados);
      this.dadosForm.patchValue({
        bairro: dados.bairro,
        rua: dados.logradouro,
        numero: dados.numero,
        cidade: dados.localidade,
        estado: dados.uf
      });
    }
    
    limpaForm() {
      this.dadosForm.reset({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        telefone2: '',
        cep: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        estado: '',
        cidade: '',
        termos_de_uso: ''
      });
    }
    
    onSubmit() {
      // this.validaCpf(this.dadosForm.controls['cpf'].value);
      // console.log('Cpf submit: ', this.checkCpf);
      if (this.checkForm = !this.dadosForm.valid) {
        this.snackBar.open('Verifique os campos do formulário!', 'Fechar', {
          duration: 3000,
        });
        this.exibiload = false;
        return false;
      }
      this.subcribers = JSON.parse(localStorage.getItem('inscritos'));
      if (this.subcribers === null) {
        this.subcribers = {};
      } 
      let inscrito = new Subscribe(this.dadosForm.value);
      this.subcribers.push(inscrito);
      localStorage.setItem('inscritos', JSON.stringify(this.subcribers));
      this.limpaForm();
      this.openModal();
    }
  }
  