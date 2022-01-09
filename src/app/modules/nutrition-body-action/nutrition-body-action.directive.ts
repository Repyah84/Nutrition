import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[nutritionBodyAction]' })
export class NutritionBodyActionDirective {
  @HostListener('body:click') public onBodyClick(): void {
    this.bodyClick.emit();
  }

  @HostListener('click', ['$event']) public onHostClick(event: Event): void {
    event.stopImmediatePropagation();

    this.hostClick.emit();
  }

  @Output() public readonly hostClick = new EventEmitter<void>();

  @Output() public readonly bodyClick = new EventEmitter<void>();
}
