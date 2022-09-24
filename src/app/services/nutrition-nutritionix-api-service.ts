import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NutritionNutritionixDate } from '../types/nutrition-nutritionix-data.interface';
import { NutritionNutritionixFullData } from '../types/nutrition-nutritionix-full-data.interface';

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixService {
  public constructor(private readonly _http: HttpClient) {}

  public getIteByName(foodName: string): Observable<NutritionNutritionixDate> {
    return this._http.get<NutritionNutritionixDate>(
      `${environment.nutritionix.url}/search/instant`,
      {
        params: {
          query: foodName,
        },
        headers: {
          'x-app-id': `${environment.nutritionix.id}`,
          'x-app-key': `${environment.nutritionix.key}`,
        },
      }
    );
  }

  public getItemNutrients(
    fodName: string
  ): Observable<NutritionNutritionixFullData> {
    return this._http.post<NutritionNutritionixFullData>(
      `${environment.nutritionix.url}/natural/nutrients`,
      {
        query: fodName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': `${environment.nutritionix.id}`,
          'x-app-key': `${environment.nutritionix.key}`,
        },
      }
    );
  }
}
