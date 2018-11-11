import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListFormComponent } from './list-form/list-form.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {RouterModule} from '@angular/router';
import { routes } from './app.router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule, MatSelectModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatTableDataSource, MatSortModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgxMaskModule} from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FormService } from './form/form.service';
import {NgbCarouselModule, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import { SubscriberDetailsComponent } from './subscriber-details/subscriber-details.component';
import { FooterComponent } from './shared/components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    ListFormComponent,
    HeaderComponent,
    SubscriberDetailsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  entryComponents: [
    SubscriberDetailsComponent
  ],
  providers: [ FormService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
