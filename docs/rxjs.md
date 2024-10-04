# RxJS


C’est une librairie assez incontournable dans Angular( avant).
En gros, cette librairie sert beaucoup dans le développement 
d’une application reactive – application qui fonctionne principalement autour de l’évènement.

## LES SUJETS
### Subject
Le subject est une classe qui hérite de observable, vous pouvez setter / modifier la valeur.
Voici comment déclaré un subject

````typescript
export class MemberDetailPageComponent {
  member$: Subject<string> = new Subject<string>();
}
````
Pour emettre une valeur 
````typescript
member$.next('new value');
````

Pour écouter un changement

````typescript
this.member$.subscribe(()=> console.log('do something'));
````
C’est un peu près tout ce qu’il y à savoir sur un subject. 
Vous aurez tendance à vouloir l’utiliser uniquement 
lorsque vous avez besoin d’un observable qui émet une valeur sans garder un état.

### BehaviorSubject

``BehaviorSubject`` est un subject mais qui possède un état. 
Cela signifie que à tout moment nous pouvons récupérer ca valeur. 
Pour ce faire : 
````typescript
this.member$.getValue()
````

### TRANSFORMATION DES DONNÉES
RxJS met a dispostion un pipe qui pemet d’encapsuler une série de changement, 
voici un code commenté qui vous montrera les principaux pipe que vous pourriez trouver ! 
````typescript
this.member$.pipe( 
    // Fonction qui n'aura aucun effet dans le subscribe 
    tap((member: string) => console.log('member', member)), 
    // cet opérateur sert à modifier la valeur d'entrée vers une autre valeur de sortie. 
    // equivalent de la fonction map de typescript 
    map((member: string) => 'je change ma valeur ici!'), 
    // cet opérateur permet de retourner un nouvel observable, 
    // c'est utile si par exemple 
    // vous devez récupérer les params d'url puis récupérer un user via l'api 
    switchMap((member: string) => of('nouvelle valeur'))) 
      .subscribe((result: string) => console.log('do something', result)
);
````
Cet exemple est assez court mais finalement expliquer bien le concept !
Remarquez le ``pipe()``, dans celui-ci vous avez une série d’opérateur
Tap ➔ fonction side effect – ne modifie pas la valeur
Map ➔ fonction de transformation – transforme la valeur en entrée vers une en sortie
SwitchMap ➔ fonction permettant de retourner un nouvel observable.