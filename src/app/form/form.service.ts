import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subscribe } from '../model/subscribe.model';

@Injectable()
export class FormService {

  emitirInscrito = new EventEmitter();

  constructor() { }

}
