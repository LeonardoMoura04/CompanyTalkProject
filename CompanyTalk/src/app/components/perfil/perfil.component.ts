import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/Departamento';
import { Funcao } from 'src/app/models/Funcao';
import { Pessoa } from 'src/app/models/Pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public pessoa!: Pessoa;
  public funcao!: Funcao;
  public departamento!: Departamento;

  public profilePicture!: string;
  public default!: string;

  constructor(private pessoaService: PessoaService,
              private storage: SessionStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPessoa();
  }

  getPessoa(): void{
    // this.pessoaService.getById(this.storage.get('pessoa').id).subscribe(
    //   (resultPessoa) => {
    //     this.pessoa = resultPessoa;


    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // )

    this.pessoa = this.storage.getLoggedPerson();

    this.funcao = this.pessoa.funcao;
    this.departamento = this.pessoa.departamento;
    this.default = this.pessoa.sexo == "Masculino" ? "man.png" : "woman.png";
    this.profilePicture = this.pessoa.cpf + '.png';
  }

  public deslogar(){
    this.storage.logout();
    this.router.navigate([`../login`]);
  }
}
