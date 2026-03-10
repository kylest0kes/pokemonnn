import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private router: Router) {}

  navigateToHome() {
    const isOnHome = this.router.url === '/' || this.router.url.startsWith('/?');
    if (isOnHome) {
      window.location.reload();
    }
    this.router.navigate(['/']);
  }
}
