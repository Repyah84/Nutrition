import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Self,
  TrackByFunction,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, of } from 'rxjs';
import { emergenceAnimation } from 'src/app/animation/nutrition-emergence.animation';
import { NUTRITION_DOCUMENT_DATA } from '../../tokens/nutrition-document-data';
import { NutritionCardPageService } from './nutrition-card-page.service';

@Component({
  selector: 'app-nutrition-card-page',
  templateUrl: './nutrition-card-page.component.html',
  styleUrls: ['./nutrition-card-page.component.scss'],
  providers: [NutritionCardPageService],
  animations: [emergenceAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardPageComponent implements OnDestroy {
  private readonly _subscription = new Subscription();

  public readonly search = new FormControl('');

  public readonly trackByIndexFn = (index: number): number => index;

  public readonly nutritionComposition$ =
    this._nutritionix.nutritionComposition$;

  public constructor(
    @Self() private readonly _nutritionix: NutritionCardPageService
  ) {
    this._subscription.add(
      this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        if (value) {
          this._nutritionix.search(value);
          return;
        }

        this._nutritionix.invalidateState();
      })
    );
  }

  public onSelectItem(itemName: string): void {
    this.search.setValue('', { emitEvent: false });

    this._nutritionix.increaseItem(itemName);
  }

  public onBtnClear(): void {
    this.search.setValue('', { emitEvent: false });

    this._nutritionix.invalidateState();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
