import {
  Component,
  ChangeDetectionStrategy,
  Self,
  TrackByFunction,
} from '@angular/core';

import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { Router } from '@angular/router';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';
import { NutritionCardsPageService } from './nutrition-cards-page.service';
import { NutritionNoteDocument } from '../../types/nutrition-note-document.interface';

@Component({
  selector: 'app-nutrition-cards-page',
  templateUrl: './nutrition-cards-page.component.html',
  styleUrls: ['./nutrition-cards-page.component.scss'],
  providers: [NutritionCardsPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardsPageComponent {
  public readonly notes$ = this._store.notesList$;

  public readonly nutritionTrackByIdFn: TrackByFunction<NutritionNoteDocument> =
    (_index: number, { noteId }) => noteId;

  public constructor(
    @Self() private readonly _nutrition: NutritionCardsPageService,
    private readonly _store: NutritionNotesCacheService
  ) {}

  public onDeleteNote(noteId: string): void {
    this._nutrition.delete(noteId);
  }
}
