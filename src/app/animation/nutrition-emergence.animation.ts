import {
  animate,
  AnimationStyleMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

const STYLE: AnimationStyleMetadata = style({
  opacity: 0,
  transform: 'scaleY(0.8)',
});

export const emergenceAnimation = trigger('emergenceAnimation', [
  transition(':enter', [
    STYLE,
    animate('150ms cubic-bezier(0, 0, 0.2, 1)', style('*')),
  ]),
  transition(':leave', [animate('100ms 25ms', STYLE)]),
]);
