import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ListFormComponent } from '../../../list-form/list-form.component';
import { FormComponent } from '../../../form/form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {
  
  constructor(public activeModal: NgbActiveModal) { }
  
  ngOnInit() {
  }
  
  fechaModal(option: string) {
    if (option === 'cadastrados') {
      this.activeModal.close(1);
    } else {
      this.activeModal.close();
    }
  }
  
}
