import { Component } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CabezeraComponent } from './cabezera/cabezera.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabezeraComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-juegos';
}
