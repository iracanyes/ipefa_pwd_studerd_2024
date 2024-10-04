import { Component, computed, effect, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, delay, map, of, Subject, switchMap, tap } from 'rxjs';
import { MemberService } from '@dashboard/feature/member/service/member.service';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './member-detail-page.component.html',
  styleUrl: './member-detail-page.component.scss'
})
export class MemberDetailPageComponent {
  @Input() id!: string;

  private readonly memberService: MemberService = inject(MemberService);

  // RxJS
  // BehaviorSubject can return a value
  // Subject doesn't return a value
  memberSubject: Subject<string> = new Subject();
  memberBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>("nobody RxJS");

  // Signals
  // Here we create a writable signal
  member: WritableSignal<string> = signal('nobody');

  // Signal - computed
  // are read-only signals that derive their value from other signals
  // computed() calculate its value at first read and then cache it
  // its value will be recalculated at next read only when its internal signals have changed
  // Here we create a computed signal
  memberFirstnameLastname: Signal<string> = computed(() => `fake example of data extraction from object ${this.member()}`);

  // Signals - Effect
  // Effect will be run at least once,  it tracks any signal value reads
  // and recalculate when an internal signal change its value
  // effects keep track of their dependencies dynamically,
  // and only track signals which were read in the most recent execution.
  memberEffect = effect(() => console.log(`Mon effet sur le membre: ${this.member}`));
  memberFirstnameLastnameEffect = effect(
    () => console.log(`Mon effet sur le membre: ${this.memberFirstnameLastname}`)
  );


  //
  detail$: Signal<string> = computed(
    () => this.memberService
      .List$()
      .find((member: string) => member === this.id )
    || 'not found'
  );



  // When the component is initialized, we retrieve data from data source,
  // with a delay of 5sec
  ngOnInit(): void {
    // Signals
    this.getDataSignal();

    // RxJS
    this.getDataFromSubject();
    this.getDataFromWritableSubject();

    // this.getDetail();
  }

  // Simulate a data source with an observable which change the value
  // of the observable
  getDataSignal(): void {
    of(this.member())
     .pipe(
       delay(5000),
       tap(() => this.member.set('Nicolas'))
     )
     .subscribe();
  }

  getDataFromSubject(): void {
    // All the transformation must be defined before the change of value
    this.memberSubject
    .pipe(
      delay(3000),
      tap((member) => console.log('member',member)),
      map((member: string) => 'I change the value here!'),
      tap((member) => console.log('member',member)),
      switchMap((member: string) => of('new value'))
    ).subscribe((result: string) => console.log('do something', result));

    // Change the value will trigger all listeners
    this.memberSubject.next('second value');

    of(this.memberSubject)
      .pipe(
        delay(3000),
        tap(subject => subject.next('third value')),
        delay(3000),
        map(subject => subject.next('forth value')),
      )
      .subscribe();

  }

  getDataFromWritableSubject(): void {
     of(this.memberBehaviorSubject)
     .pipe(
       delay(5000),
       map((member) => {
         // Do something with member

         // Set new value
         member.next('RxJS new value')
       })
     )
     .subscribe();
  }

  //
  setDetail(): void {
    this.memberService.setDetail(this.id);
  }


}
