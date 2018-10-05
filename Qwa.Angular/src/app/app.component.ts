import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zejafo.it';
  name: String;

  public setName(name: String) {
    this.name = name;
  }
}
