import { Pipe, PipeTransform } from '@angular/core';
import { NutritionNutritionixState } from '../../../../types/nutrition-nutritionix-state.interface';

@Pipe({ name: 'allCalories' })
export class NutritionAllCaloriesPipe implements PipeTransform {
  public transform(value: NutritionNutritionixState): number {
    let num = 0;

    for (let key in value) {
      num += value[key].nf_calories;
    }

    return num;
  }
}
