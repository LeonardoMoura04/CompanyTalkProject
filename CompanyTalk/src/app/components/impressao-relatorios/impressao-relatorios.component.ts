import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogEntrada } from 'src/app/models/LogEntrada';
import { Pessoa } from 'src/app/models/Pessoa';
import { LogEntradaService } from 'src/app/service/logEntrada.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { NavigationItem } from 'src/app/components/navi/navi.component';
import { NotificationService } from 'src/app/service/notification.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';

@Component({
  selector: 'app-impressao-relatorios',
  templateUrl: './impressao-relatorios.component.html',
  styleUrls: ['./impressao-relatorios.component.css']
})
export class ImpressaoRelatoriosComponent implements OnInit, AfterViewInit {

    @ViewChild("userReportRef") userReportRef!: ElementRef;
    @ViewChild("activityControlRef") activityControlRef!: ElementRef;

    public pessoa: Pessoa[] = new Array<Pessoa>();
    public pessoaLogada!: Pessoa;
    public logEntrada: LogEntrada[] = new Array<LogEntrada>();
    public navItems: Array<NavigationItem> = new Array<NavigationItem>();

    constructor(private pessoaService: PessoaService,
                private logEntradaService: LogEntradaService,
                private notification: NotificationService,
                private storage: SessionStorageService) { }

    ngOnInit(): void {
      this.pessoaLogada = this.storage.getLoggedPerson();
      if(this.pessoaLogada.departamento.id != 1){
        this.notification.popNotification('Você não tem permissão para fazer alterações nesta página, por favor, entre em contato com o departamento tecnológico.');
      }
      this.getPessoa();
      this.getLogEntrada();
    }

    ngAfterViewInit() {
      this.navItemSettings();
    }

    private navItemSettings(){
        [{link: "dashboard", text:"Home"},
        {link: this.userReportRef, text:"Relatório de Usuários"},
        {link: this.activityControlRef, text:"Controle de Atividades"}].forEach(item => {
            this.navItems.push(new NavigationItem(item.link, item.text));
        });
    }

    getPessoa(): void{
        this.pessoaService.getAll().subscribe(
            (resultPessoa) => {
            this.pessoa = resultPessoa;
            },
            (error) => {
            console.error(error);
            }
        )
    }

    getLogEntrada(){
        this.logEntradaService.getAll().subscribe(
            (resultLogEntrada) => {
            this.logEntrada = resultLogEntrada;
            },
            (error) => {
            console.error(error);
            }
        )
    }

}
