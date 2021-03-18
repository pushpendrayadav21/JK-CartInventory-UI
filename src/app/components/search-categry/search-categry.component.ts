import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-categry',
  templateUrl: './search-categry.component.html',
  styleUrls: ['./search-categry.component.css']
})
export class SearchCategryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    console.log(`The Search keyword ${value}`);
    this.router.navigateByUrl(`/searchByCategory/${value}`);
  }
}
