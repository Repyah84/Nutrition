import { Component, ChangeDetectionStrategy, Self } from '@angular/core';

import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { NutritionNotesActionService } from 'src/app/services/nutrition-notes-actions.service';
import { Router } from '@angular/router';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';

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
    @Self() private readonly _nutrition: NutritionNotesActionService,
    private readonly _store: NutritionNotesCacheService,
    private readonly _router: Router
  ) {}

  public onSelectNote(noteId: string): void {
    this._router.navigate([NutritionRoutersPages.NOTE], {
      queryParams: {
        noteId,
      },
    });
  }

  public onDelete(noteId: string): void {
    this._nutrition.delete(noteId);
  }
}
