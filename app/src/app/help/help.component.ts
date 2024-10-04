import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  title = 'My Angular Apps Help Page';
}
