import { Component, ChangeDetectionStrategy, Self } from '@angular/core';

import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { NutritionNotesActionService } from 'src/app/services/nutrition-notes-actions.service';

@Component({
  selector: 'app-nutrition-cards-page',
  templateUrl: './nutrition-cards-page.component.html',
  styleUrls: ['./nutrition-cards-page.component.scss'],
  providers: [NutritionNotesActionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardsPageComponent {
  public readonly notes$ = this._store.notesList$;

  public constructor(
    private readonly _store: NutritionNotesCacheService,
    @Self() private readonly _nutrition: NutritionNotesActionService
  ) {}

  public onDelete(noteId: string): void {
    this._nutrition.delete(noteId);
  }
}
