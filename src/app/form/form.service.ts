import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormService {

  constructor(private http: HttpClient) { }

  getCep (cep: string) {
    this.http.get(`//viacep.com.br/ws/${cep}/json/`)
      .subscribe(dados => { 
        // 
        console.log('dados', dados);
        return dados;
      });
  }
}
