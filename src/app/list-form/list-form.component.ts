import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {

  displayedColumns = ['name', 'email', 'city'];
  dataSource = [];
  listaInscritos = [];


  constructor() {
    this.listaInscritos = JSON.parse(localStorage.getItem('inscritos'));
    console.log('Lista: ', this.listaInscritos);
    this.dataSource = this.listaInscritos;
  }
  
    ngOnInit() {
    
    }

}
