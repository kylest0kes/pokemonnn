import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
