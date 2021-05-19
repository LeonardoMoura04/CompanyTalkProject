import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogEntrada } from 'src/app/models/LogEntrada';
import { Pessoa } from 'src/app/models/Pessoa';
import { LoginParameters } from 'src/app/parameters/login.parameters';
import { LogEntradaService } from 'src/app/service/logEntrada.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login!: string;
  public senha!: string;
  public loginParameters!: LoginParameters;

  dataLog!: string;
  horaLog!: string;

  logEntrada!: LogEntrada;

  public today = new Date();

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private storage: SessionStorageService,
    private notification: NotificationService,
    private logEntradaService: LogEntradaService
  ) {}

  ngOnInit(): void {
    document.getElementsByTagName('html')[0].style.backgroundColor =
      'RGB(119, 215, 188)';
    this.verifyLogin();
  }

  public logar() {
    this.loginParameters = new LoginParameters(this.login, this.senha);

    this.pessoaService.login(this.loginParameters).subscribe(
      (resultPessoa) => {
        var result = resultPessoa;

        if (result.id > 0) {
          this.storage.add(result, 'pessoa');

          this.insertLogEntrada(result);

          this.notification.addNotification({
            message: 'Você foi logado com sucesso!',
          });
          this.router.navigate([`../dashboard/${result.id}`]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getToday() {
    this.dataLog =
      this.today.getDate() +
      '/' +
      (this.today.getMonth() + 1) +
      '/' +
      this.today.getFullYear();

    this.horaLog =
      this.today.getHours() +
      ':' +
      this.today.getMinutes() +
      ':' +
      this.today.getSeconds();
  }

  insertLogEntrada(pessoa: Pessoa) {
    this.getToday();
    this.logEntrada = new LogEntrada(pessoa, this.dataLog, this.horaLog);
    this.logEntradaService.post(this.logEntrada).subscribe(
      () => {
        var result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verifyLogin() {
    try {
      this.storage.getLoggedPerson();
      this.router.navigate([
        `../dashboard/${this.storage.getLoggedPerson().id}`,
      ]);
    } catch (error) {}
  }
}
