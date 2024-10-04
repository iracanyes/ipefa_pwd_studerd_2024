import { Directive, ElementRef, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[labelWithParam]',
  standalone: true
})
export class LabelWithParamDirective {
  @Input({ required: true })
  label!: string;

  @Input()
  params?: any;

  private readonly translate: TranslateService = inject(TranslateService);

  el: ElementRef = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this.translate.instant(this.label, this.params);
  }
}
