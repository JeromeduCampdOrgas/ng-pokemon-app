import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appButtonHover]",
})
export class ButtonHoverDirective {
  constructor(private el: ElementRef) {
    this.setPointer();
  }

  @Input("pkmButtonHover") btnHover: string;

  @HostListener("mouseover") onMouseOver() {
    console.log("je te survole");
  }

  private setPointer() {
    this.el.nativeElement.style = "cursor";
  }
}
