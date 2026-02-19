import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Grid } from "./shared/grid/grid";
import { Header } from "./shared/header/header";
import { Navbar } from "./shared/navbar/navbar";
import { Home } from "./pages/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pokemonnn-frontend');
}
