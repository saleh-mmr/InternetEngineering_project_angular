import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  flag = true;

  constructor() { }


  changFlag(): void{
    this.flag = !this.flag;
  }

  ngOnInit(): void {
  }

}
