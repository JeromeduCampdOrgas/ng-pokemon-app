import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[pkmButtonHover]",
})
export class ButtonHoverDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseover") onMouseOver() {
    this.el.nativeElement.style.cursor = "pointer";
  }
}
