import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  @Input() type: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
