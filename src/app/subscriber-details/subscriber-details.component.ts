import { Component, OnInit, Inject } from '@angular/core';
import { ListFormComponent, DialogData } from '../list-form/list-form.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.component.html',
  styleUrls: ['./subscriber-details.component.css']
})
export class SubscriberDetailsComponent implements OnInit {

  maskTelefone: string;
  maskTelefone2: string;
  
  constructor(public dialogRef: MatDialogRef<ListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

      console.log('Teste: ', data.obj );
      this.maskTelefone = this.maskTelefone2 = '(00) 0000-00000';
      this.mascaraTel('7199999999');
    }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  /**
   * Retorna o valor do telefone com máscara (XX) XXXX-XXXX ou (XX) XXXXx-XXXX 
   * @param campo - campo string com o valor do telefone
   */
  mascaraTel(campo: string) {

    // Se campo telefone com DDD + 8 dígitos
    if (campo.length < 11) {
      // Pega o DDD
      const ddd = campo.slice(0,2);

      // Primeira metade
      const numero1 = campo.slice(2,6);

      // Segunda metade
      const numero2 = campo.slice(6);
      return '(' + ddd + ') ' + numero1 + '-' + numero2;
    } else {

      const ddd = campo.slice(0,2);
      const numero1 = campo.slice(2,7);
      const numero2 = campo.slice(7);
      return '(' + ddd + ') ' + numero1 + '-' + numero2;
    }
  }

  /**
   * Retorna o valor do valor com a máscara XXX.XXX.XXX-XX
   * @param campo - campo com o valor do CPF
   */
  mascaraCpf(cpf: string) {
    const num1 = cpf.slice(0,3);
    const num2 = cpf.slice(3,6);
    const num3 = cpf.slice(6,9);
    const dig = cpf.slice(9,11);
    return num1 + '.' + num2 + '.' + num3 + '-' + dig;
  }
  
  mascaraCep (cep: string) {
    const num1 = cep.slice(0,2);
    const num2 = cep.slice(2,5);
    const num3 = cep.slice(5,7);
    return num1 + '.' + num2 + '-' + num3;
  }

}
