import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  // cela signifie que le service est disponible depuis partout
  // et instancié au démarrage de l’application.
  providedIn: 'root'
})
export class MemberService {
  List$: WritableSignal<string[]> = signal(['Test User2','Test User 2']);
  Detail$: WritableSignal<string> = signal('');

  constructor() { }

  setDetail(id: string): void {
    this.Detail$.set('Test user');
  }


}
