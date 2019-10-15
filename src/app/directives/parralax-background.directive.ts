import { Directive, Input, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[parralaxBackground]"
})
export class ParralaxBackgroundDirective {
  constructor(private elem: ElementRef) {}

  ngAfterViewInit() {
    this.background = this.elem.nativeElement.querySelectorAll(
      ".parralax-image"
    )[0];
    this.canMove = true;
  }

  @Input() movementStrength: number = 50;
  canMove = false;
  width = this.movementStrength / screen.width;
  height = this.movementStrength / screen.height;
  background = null;

  @HostListener("mousemove", ["$event"]) onMouseMove(e: MouseEvent) {
    if (this.canMove) {
      let pageX = this.width * (e.pageX - screen.width / 2) * -1;
      let pageY = this.height * (e.pageY - screen.height / 2) * -1;
      this.background["style"][
        "transform"
      ] = `translate(${pageX}px, ${pageY}px)`;
    }
  }
}
