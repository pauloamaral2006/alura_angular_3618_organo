import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;
    component.readOnly = false;
    fixture.detectChanges();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deveria atribuir um valor para a classificação quando o método writeValue dfor chamado', () => {
    const classificacao = 3;
    component.writeValue(classificacao);
    expect(component.classificacao).toBe(classificacao);
  });

  it('deveria chamar o onChange quando o método classificar for chamado', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const classificacao = 3;
    component.classificar(classificacao);
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('deveria chamar o onTouched quando o método classificar for chamado', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    const classificacao = 3;
    component.classificar(classificacao);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
  it('não deveria atualizar a classificação quando a propriedade readonly for true', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    component.readOnly = true;
    const classificacao = 5;
    component.classificar(classificacao);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(component.classificacao).not.toBe(classificacao);
  });

  it('deveria ignorar valores inválidos e atribuir o valor 1 à classificação', () => {
    const valroesInvalidos = [-6, 0, 'abc', undefined];
    valroesInvalidos.forEach((valorInvalido) => {
      component.writeValue(valorInvalido as any);
      expect(component.classificacao).toBe(1);
    });
  });

  it('deveria atualizar o DOm quando a classificaçãoo muda', () => {
    const classificacao = 3;
    component.classificar(classificacao);

    const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');

    expect(estrelaPreenchida).toBeTruthy();
  });

  it('deve inicializar com a classificação padrão de 1', () => {
    expect(component.classificacao).toBe(1);
  });

  it('deve atualizar a classificação quando o @Input mudar', () => {
    component.classificacao = 3;
    fixture.detectChanges();
    expect(component.classificacao).toBe(3);

    component.classificacao = 5;
    fixture.detectChanges();
    expect(component.classificacao).toBe(5);
  });
});
