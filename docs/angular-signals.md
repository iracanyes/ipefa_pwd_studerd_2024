# Angular - Signals

Pour rappel, le signal est une des nouvelles primitives , 
elle est accessible en lecture / écriture
Créons notre premier signal. 
Pour ce faire nous allons utiliser l’exemple détail d’un membre. 
Pour l’exemple, et vu que l’on n’a pas encore vu les services, 
nous allons simulés un chargement 
````typescript
export class MemberDetailPageComponent { 
  @Input() id!: string; 
  member: WritableSignal<string> = signal('no body'); 
}
````
Si nous voulons utiliser une interpolation dans le template : 
````html
<p>
  Mon super membre {{member()}}
</p>

````

Constatez que par rapport à une variable classique nous devons ajouter des parenthèses 
pour accéder à la valeur ! Simulons l’appel à l’api , 
nous allons faire du code avec rxJS, c’est juste pour la démo. 
Je ne rentrerais pas dans le détail ici nous avons un chapitre pour cela.
````typescript
export class MemberDetailPageComponent {
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    of(this.member()).pipe(
      delay(5000), tap(() => this.member.set('Nicolas'))
    ).subscribe();
  }
}
````
Tester le code et attendez cinq secondes. Vous verrez alors le nom changé !
Vous pouvez remarquer aussi comment mettre à jours un signal grâce à la méthode ``set()``
C’est un peu près tout ce qu’il faut savoir sur un signal.

### COMPUTED
Pour rappel, le computed est une des nouvelles primitives , 
elle est accessible en lecture. 
Sa valeur est calculée grâce au signaux. 
Lorsqu’un signal change de valeur , celle du computed est automatiquement mise à jours !
Pour créer un computed rien de plus simple ! 
````typescript
export class MemberDetailPage {
  memberFirstNameLastname: Signal<string> = computed(() => `fake example of data extraction from object ${this.member()}`)
}
````
Dans le template ce sera exactement la même chose, 
finalement computed est un signal il n’est juste pas Writable. 
````html
Mon ID : {{id}}<br> 
Mon super membre {{member()}} <br> 
Mon computed {{memberFirstNameLastname()}}
````
Attendez les cinq secondes et vous verrez que le computed est également transformé !

## EFFECT
Pour rappel, effect est une fonction qui sera exécuté à chaque changement de valeur 
d’un signal. 
L’avantage par rapport à RxJS c’est que vous n’avez pas besoin de vous désinscrire , 
il le fera automatiquement.
Voici un exemple d’effect. 
Nous pourrions très bien imaginer que cela soit un peu plus « intéressant » 
ou « complexe » comme utilisation mais l’idée est surtout de présenter cette primitive. 
````typescript
memberEffect = effect(() => console.log(`Mon effect sur le member : ${this.member()}`)); 
memberFirstNameLastNameEffect = effect(() => 
  console.log(`Mon effect sur le memberFirstNameLastname : ${this.memberFirstNameLastname()}`)
);
````
Voici le résultat
Vous pouvez remarquer que l’effect est directement exécuté à l’initialisation du composant. Puis une seconde fois quand la valeur a changé !
9.7. CONCLUSION
Ce chapitre est assez court, je préfères expliquer les différentes possibilités 
avec des cas concret que nous rencontrerons plus tard dans le cours.
Pour en savoir plus sur rxJS https://rxjs.dev/
Pour en savoir plus sur les signaux https://angular.io/guide/signals