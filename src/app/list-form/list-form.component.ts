import { Component, OnInit, ViewChild, RenderComponentType, Inject, Input } from '@angular/core';
import {MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatPaginator} from '@angular/material';
import { SubscriberDetailsComponent } from '../subscriber-details/subscriber-details.component';
import {ComponentType} from '@angular/cdk/portal';
import { Subscribe } from '../model/subscribe.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface DialogData {
  obj: Subscribe;
}

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css'],
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


export class ListFormComponent implements OnInit {
  
  displayedColumns = ['name', 'city', 'detalhes'];
  listaInscritos = JSON.parse(localStorage.getItem('inscritos'));
  dataSource = new MatTableDataSource(this.listaInscritos);
  // dataSource: MatTableDataSource<any>;
  
  component: ComponentType<any>;
  obj: Subscribe;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    
  }
  
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = "Próxima página";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.paginator._intl.lastPageLabel = "Última página";
    this.paginator._intl.firstPageLabel = "Primeira página";
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDados() {
    
    // this.createTable();
  }

  createTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
