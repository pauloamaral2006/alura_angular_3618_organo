import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AvaliacaoEstrelasComponent } from '../../componentes/avaliacao-estrelas/avaliacao-estrelas.component';
import { RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { routes } from '../../app.routes';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormularioComponent,
        ReactiveFormsModule,
        AvaliacaoEstrelasComponent,
        RouterLink,
      ],
      providers: [LivroService, FormBuilder],
    }).compileComponents();

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deveria inicializar o formulário com valores vazios', () => {
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('deveria adicionar um novo livro', () => {
    const novoLivro = {
      titulo: 'Novo Livro',
      autoria: 'Autoria Desconhecida',
      imagem: 'http://example.com/cover.jpg',
      genero: 'romance',
      dataLeitura: '2024-04-19',
      classificacao: 5,
    };

    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    component.formulario.setValue(novoLivro);
    component.adicionarLivro();
    expect(adicionarLivroSpy).toHaveBeenCalledWith({
      ...novoLivro,
      genero: component.generos.find((g) => g.id === novoLivro.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenLastCalledWith(['lista-livros']);
  });
});
