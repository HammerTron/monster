import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterUndefined<T>(obs$: Observable<T>): Observable<T> {
    return obs$.pipe(filter((value: T) => value != null));
}
