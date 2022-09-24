import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, map, shareReplay, pipe, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NutritionRouterEventService {
  private readonly _event$ = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public constructor(private readonly _router: Router) {}

  public handling(urlSegment: string): Observable<boolean> {
    return this._event$.pipe(
      map(({ urlAfterRedirects }) =>
        urlAfterRedirects.split('/').some((text) => text === urlSegment)
      )
    );
  }
}
