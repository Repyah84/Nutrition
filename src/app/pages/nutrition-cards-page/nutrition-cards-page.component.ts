import { Component, ChangeDetectionStrategy, Self } from '@angular/core';

import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { Router } from '@angular/router';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';
import { NutritionCardsPageService } from './nutrition-cards-page.service';

@Component({
  selector: 'app-nutrition-cards-page',
  templateUrl: './nutrition-cards-page.component.html',
  styleUrls: ['./nutrition-cards-page.component.scss'],
  providers: [NutritionCardsPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardsPageComponent {
  public readonly notes$ = this._store.notesList$;

  public constructor(
    @Self() private readonly _nutrition: NutritionCardsPageService,
    private readonly _store: NutritionNotesCacheService,
    private readonly _router: Router
  ) {}

  public onSelectNote(noteId: string): void {
    void this._router.navigate([NutritionRoutersPages.NOTE], {
      queryParams: {
        noteId,
      },
    });
  }

  public onDelete(event: Event, noteId: string): void {
    event.stopPropagation();
    this._nutrition.delete(noteId);
  }
}
