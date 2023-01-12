import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { emergenceAnimation } from 'src/app/animation/nutrition-emergence.animation';
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

  public readonly nutritionComposition$ =
    this._nutritionix.nutritionComposition$;

  public constructor(private readonly _nutritionix: NutritionCardPageService) {
    this._subscription.add(
      this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        if (value) {
          this._nutritionix.search(value);
          return;
        }

        this._nutritionix.invalidateState$.next();
      })
    );
  }

  public onSelectItem(itemName: string): void {
    this.search.setValue('', { emitEvent: false });

    this._nutritionix.addNutritionixItem(itemName);
  }

  public onBtnClear(): void {
    this.search.setValue('', { emitEvent: false });

    this._nutritionix.invalidateState$.next();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
