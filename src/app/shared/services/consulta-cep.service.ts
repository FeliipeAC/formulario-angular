import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConsultaCepService {
  
  constructor(private http: HttpClient) { }

  consultaCep (cep: string) {
    return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
  }
}
