import { Component, Input, Output } from '@angular/core';
import EventEmitter from 'node:events';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({ required: true })
  label!: string;

  @Input({ required: false })
  icon?: string;

  @Input({ required: false })
  placeholder?: string = 'Placeholder par défaut';

  @Output()
  titleChange = new EventEmitter();

  @Output()
  coucou = new EventEmitter();

  onClick(): void {
    this.titleChange.emit("Coucou petite perruche!");
  }
}
