import { Component, Input } from "@angular/core";

@Component({
  selector: "forecast-item",
  styleUrls: ["./forecast-item.component.scss"],
  template: `
    <li>
      <span class="descriptor">{{ descriptor }}</span>
      <span class="value">{{ value }}{{ metric }}</span>
    </li>
  `
})
export class ForecastItemComponent {
  @Input() descriptor: string;
  @Input() value: string;
  @Input() metric: string = "%";
}
