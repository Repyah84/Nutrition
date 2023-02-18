import { inject, InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, switchMap, defer, map, first } from 'rxjs';
import { NutritionNotesCacheService } from '../services/nutrition-notes-cache.service';
import { NutritionRouterEventService } from '../services/nutrition-router-event.service';
import { NutritionNutritionixState } from '../types/nutrition-nutritionix-state.interface';
import { NutritionRoutersPages } from '../types/nutrition-routing-pages.enum';

export const NUTRITION_HANDLE_ROUTING_DATA_TOKEN = new InjectionToken<
  Observable<NutritionNutritionixState>
>('NUTRITION_HANDLE_ROUTING_DATA_TOKEN', {
  factory: () => {
    const route = inject(ActivatedRoute);
    const routerHandle = inject(NutritionRouterEventService);
    const cacheData = inject(NutritionNotesCacheService);

    return routerHandle.handling(NutritionRoutersPages.NOTE).pipe(
      filter((value) => value),
      switchMap(() =>
        defer(() =>
          cacheData
            .getItem(route.snapshot.queryParamMap.get('noteId') ?? 'notNoteId')
            .pipe(
              map((nutritionDocument) =>
                nutritionDocument === undefined
                  ? {}
                  : { ...nutritionDocument.nutrition }
              ),
              first()
            )
        )
      )
    );
  },
});
