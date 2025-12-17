import { Component } from '@angular/core';
import { SearchDebs } from '../search-debs/search-debs';

@Component({
  selector: 'app-home-page',
  imports: [SearchDebs],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
