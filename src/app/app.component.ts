import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 't2';
}
