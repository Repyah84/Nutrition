import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
  Output,
} from '@angular/core';
import { NutritionRoutersPages } from '../../../../types/nutrition-routing-pages.enum';
import { NutritionNoteDocument } from '../../../../types/nutrition-note-document.interface';
import { emergenceAnimation } from '../../../../animation/nutrition-emergence.animation';

@Component({
  selector: 'app-nutrition-card[note]',
  templateUrl: './nutrition-card.component.html',
  styleUrls: ['./nutrition-card.component.scss'],
  animations: [emergenceAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardComponent {
  public isOpen = false;

  public readonly notePage = ['/', NutritionRoutersPages.NOTE];

  @Input() public note!: NutritionNoteDocument;

  @Output() public readonly deleteNote = new EventEmitter<string>();

  public onDelete(): void {
    this.deleteNote.emit(this.note.noteId);
  }
}
