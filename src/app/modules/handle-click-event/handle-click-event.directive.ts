import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[handleClickEvent]' })
export class HandleClickEventDirective {
  @Output() public readonly hostClick = new EventEmitter<void>();

  @Output() public readonly bodyClick = new EventEmitter<void>();

  @HostListener('body:click') public onBodyClick(): void {
    this.bodyClick.emit();
  }

  @HostListener('click', ['$event']) public onHostClick(event: Event): void {
    event.stopImmediatePropagation();

    this.hostClick.emit();
  }
}
