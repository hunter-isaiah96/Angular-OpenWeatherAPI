import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[numberInput]"
})
export class NumberInputDirective {
  constructor(private elem: ElementRef) {}

  @HostListener("document:input") OnKeyPress() {
    this.elem.nativeElement.value = this.elem.nativeElement.value.replace(
      /[^0-9]/g,
      ""
    );
  }
}
