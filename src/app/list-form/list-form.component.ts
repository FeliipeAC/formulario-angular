import { Component, OnInit, ViewChild, RenderComponentType, Inject } from '@angular/core';
import {MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SubscriberDetailsComponent } from '../subscriber-details/subscriber-details.component';
import {ComponentType} from '@angular/cdk/portal';
import { Subscribe } from '../model/subscribe.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  obj: Subscribe;
}

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  
  displayedColumns = ['name', 'city', 'detalhes'];
  dataSource = [];
  listaInscritos = [];
  component: ComponentType<any>;
  obj: Subscribe;
  
  
  constructor(public dialog: MatDialog) {

    this.listaInscritos = JSON.parse(localStorage.getItem('inscritos'));
    console.log('Lista: ', this.listaInscritos);
    this.dataSource = this.listaInscritos;
  }
  
  ngOnInit() {
    
  }

  /**
   * Abre moodal com detalhes do inscrito
   * @param elem - objeto do tipo Subscriber 
   */
  detalhesCurso(elem) {
    this.component = SubscriberDetailsComponent;
    const dialogRef = this.dialog.open(this.component, {
      maxWidth: '85vw',
      data: {obj: elem}
    });
    dialogRef.beforeClose().subscribe(result => {
      console.log('Modal fechado');
    })
  }
  
}
