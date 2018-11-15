import { Component, OnInit, Inject } from '@angular/core';
import { ListFormComponent, DialogData } from '../list-form/list-form.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-subscriber-details',
  templateUrl: './subscriber-details.component.html',
  styleUrls: ['./subscriber-details.component.css']
})
export class SubscriberDetailsComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<ListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      console.log('Teste: ', data.obj );
    }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
