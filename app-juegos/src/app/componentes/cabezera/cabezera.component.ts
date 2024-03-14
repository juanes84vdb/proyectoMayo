import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cabezera',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './cabezera.component.html',
  styleUrl: './cabezera.component.css'
})
export class CabezeraComponent {

}
