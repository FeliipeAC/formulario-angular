import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  imagem = "https://picsum.photos/1110/492/?image=1";

  constructor() { }

  ngOnInit() {
  }

}
