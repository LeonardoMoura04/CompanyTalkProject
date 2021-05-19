import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { FuncaoService } from 'src/app/service/funcao.service';
import { Departamento } from 'src/app/models/Departamento';
import { Funcao } from 'src/app/models/Funcao';
import { NavigationItem } from 'src/app/components/navi/navi.component';
import { NotificationService } from 'src/app/service/notification.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';

@Component({
  selector: 'app-edicao-dados',
  templateUrl: './edicao-dados.component.html',
  styleUrls: ['./edicao-dados.component.css']
})
export class EdicaoDadosComponent implements OnInit, AfterViewInit {

  public pessoaId!: number;
  public pessoa!: Pessoa;
  public pessoas!: Pessoa[];
  public departamentos!: Departamento[];
  public funcoes!: Funcao[];

  public pessoaCpf!: string;
  public pessoaNome!: string;
  public pessoaSexo!: string;
  public pessoaDataNascimento!: string;
  public pessoaTelefone!: string;
  public pessoaEmail!: string;
  public pessoaFuncao!: number;
  public pessoaDepartamento!: number;
  public pessoaSenha!: string;

  public pessoaIdAlterar!: number;
  public pessoaCpfAlterar!: string;
  public pessoaNomeAlterar!: string;
  public pessoaSexoAlterar!: string;
  public pessoaDataNascimentoAlterar!: string;
  public pessoaTelefoneAlterar!: string;
  public pessoaEmailAlterar!: string;
  public pessoaFuncaoAlterar!: number;
  public pessoaDepartamentoAlterar!: number;
  public pessoaSenhaAlterar!: string;

  public sexo = [
    {nome: 'Masculino'},
    {nome: 'Feminino'},
    {nome: 'Prefiro não optar'}
  ];

  public navItems: Array<NavigationItem> = new Array<NavigationItem>();

  @ViewChild("cadastrarRef") cadastrarRef!: ElementRef;
  @ViewChild("consultarRef") consultarRef!: ElementRef;
  @ViewChild("alterarRef") alterarRef!: ElementRef;

  public sessaoPessoaId!: number;

  constructor(private router: ActivatedRoute,
              private pessoaService: PessoaService,
              private departamentoService: DepartamentoService,
              private funcaoService: FuncaoService,
              private route: Router,
              private notification: NotificationService,
              private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.pessoaId = this.router.snapshot.params.pessoaId;
    this.getPessoa();
    if(this.pessoa.departamento.id != 1){
      this.notification.popNotification('Você não tem permissão para fazer alterações nesta página, por favor, entre em contato com o departamento tecnológico.');
    }
    this.popularSelects();
  }

  ngAfterViewInit() {
    this.navItemSettings();
  }

  navItemSettings(){
    [{link: "dashboard", text:"Home"},
      {link: this.cadastrarRef, text:"Cadastrar Usuários"},
      {link: this.consultarRef, text:"Consultar Usuários"},
      {link: this.alterarRef, text:"Alterar Usuários"}].forEach(item => {
       this.navItems.push(new NavigationItem(item.link, item.text));
    });
  }

  private popularSelects(){
    this.getDepartamentos();
    this.getFuncoes();
    this.getAllPessoas();
  }

  getPessoa(pessoaId: number = 0): void{
    // this.pessoaService.getById(pessoaId > 0 ? pessoaId : this.pessoaId).subscribe(
    //   (resultPessoa) => {
    //     this.pessoa = resultPessoa;
    //     this.sessaoPessoaId = resultPessoa.id;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // )

    this.pessoa = this.storage.getLoggedPerson();
  }

  getAllPessoas(): void{
    this.pessoaService.getAll().subscribe(
      (resultPessoa) => {
        this.pessoas = resultPessoa;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getDepartamentos(): void{
    this.departamentoService.getAll().subscribe(
      (resultDepartamento) => {
        this.departamentos = resultDepartamento;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getFuncoes(): void{
    this.funcaoService.getAll().subscribe(
      (resultFuncao) => {
        this.funcoes = resultFuncao;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public criarPessoa(){
    this.pessoa = new Pessoa();

    this.pessoa.cpf = this.pessoaCpf;
    this.pessoa.nome = this.pessoaNome;
    this.pessoa.sexo = this.pessoaSexo;
    this.pessoa.dataNascimento = this.pessoaDataNascimento;
    this.pessoa.telefone = this.pessoaTelefone;
    this.pessoa.email = this.pessoaEmail;
    this.pessoa.funcaoId = this.pessoaFuncao;
    this.pessoa.departamentoId = this.pessoaDepartamento;
    this.pessoa.senha = this.pessoaSenha;
    this.pessoa.ativo = true;

    this.pessoaService.post(this.pessoa).subscribe(
      (resultPessoa) => {
        this.pessoas.push(resultPessoa as Pessoa);
        this.notification.popNotification('Criado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public alterarPessoa(pessoaId: number){
    this.getPessoa(pessoaId);

    this.pessoa.id = this.pessoaIdAlterar;
    this.pessoa.nome = this.pessoaNomeAlterar;
    this.pessoa.sexo = this.pessoaSexoAlterar;
    this.pessoa.dataNascimento = this.pessoaDataNascimentoAlterar;
    this.pessoa.telefone = this.pessoaTelefoneAlterar;
    this.pessoa.email = this.pessoaEmailAlterar;
    this.pessoa.funcaoId = this.pessoaFuncaoAlterar;
    this.pessoa.departamentoId = this.pessoaDepartamentoAlterar;
    this.pessoa.senha = this.pessoaSenhaAlterar;
    this.pessoa.salt = '';

    this.pessoaService.put(this.pessoa).subscribe(
      () => {
        this.notification.popNotification('Alterado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public preencherCampos(item: Pessoa){
    this.pessoaIdAlterar = item.id;
    this.pessoaCpfAlterar = item.cpf;
    this.pessoaNomeAlterar = item.nome;
    this.pessoaSexoAlterar = item.sexo;
    this.pessoaDataNascimentoAlterar = item.dataNascimento;
    this.pessoaTelefoneAlterar = item.telefone;
    this.pessoaEmailAlterar = item.email;
    this.pessoaFuncaoAlterar = item.funcaoId;
    this.pessoaDepartamentoAlterar = item.departamentoId;
  }

  public desativarPessoa(pessoa: Pessoa){
    this.pessoaService.desativarAtivarPessoa(pessoa).subscribe(
      (resultPessoa) => {
        this.getAllPessoas();
          if(!pessoa.ativo){
            this.notification.popNotification('Pessoa ativada com sucesso!');
          }
          else{
            this.notification.popNotification('Pessoa desativada com sucesso!');
          }
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
