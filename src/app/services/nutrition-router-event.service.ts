import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, map, shareReplay } from 'rxjs';
import { NutritionRoutersPages } from '../types/nutrition-routing-pages.enum';

@Injectable({ providedIn: 'root' })
export class NutritionRouterEventService {
  private readonly _event$ = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public constructor(private readonly _router: Router) {}

  public handling(urlSegment: NutritionRoutersPages): Observable<boolean> {
    return this._event$.pipe(
      map(({ urlAfterRedirects }) => {
        const reg = new RegExp(`[/]${urlSegment}(?=$|[?])`);

        return urlAfterRedirects.search(reg) === 0 ? true : false;
      })
    );
  }
}
