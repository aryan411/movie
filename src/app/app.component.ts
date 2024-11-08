import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MoviesMfModule } from "../modules/movie/movies-mf.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MoviesMfModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "movies-mf";
}
