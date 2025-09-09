import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodapeComponent } from './rodape.component';


describe('RodapeComponent', () => {
  let component: RodapeComponent;
  let fixture: ComponentFixture<RodapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodapeComponent], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(RodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deveria definir as propriedades alt e src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('deveria renderizar o conteúdo baseado nas propriedades src e alt', () => {
    component.src = 'https://example.com/test-image.jpg';
    component.alt = 'Imagem teste';
    expect(component).toMatchSnapshot();
  });
});
