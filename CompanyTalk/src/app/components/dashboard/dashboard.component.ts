import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from 'src/app/models/Departamento';
import { Feed } from 'src/app/models/Feed';
import { Funcao } from 'src/app/models/Funcao';
import { Pessoa } from 'src/app/models/Pessoa';
import { Reuniao } from 'src/app/models/Reuniao';
import { NavigationItem } from 'src/app/components/navi/navi.component';
import { FeedService } from 'src/app/service/feed.service';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ReuniaoService } from 'src/app/service/reuniao.service';
import { EmailService } from 'src/app/service/email.service';
import { Email } from 'src/app/models/Email';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("feedRef") feedRef!: ElementRef;
  @ViewChild("meetingRef") meetingRef!: ElementRef;
  @ViewChild("emailRef") emailRef!: ElementRef;

  public pessoa: Pessoa = new Pessoa();
  public pessoaId!: number;
  public departamento: Departamento = new Departamento();
  public funcao: Funcao = new Funcao();
  public feed: Feed[] = new Array<Feed>();
  public reuniao: Reuniao[] = new Array<Reuniao>();
  public navItems: Array<NavigationItem> = new Array<NavigationItem>();

  public destinatario!: string;
  public assunto!: string;
  public textoEmail!: string;

  public today = new Date();

  public profilePicture!: string;

  constructor(private pessoaService: PessoaService,
              private feedService: FeedService,
              private reuniaoService: ReuniaoService,
              private emailService: EmailService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: SessionStorageService,
              private notification: NotificationService) { }

  async ngOnInit(){
    this.pessoa = this.route.snapshot.params.pessoaId;
    this.getFeed();
    this.getReuniao();
    this.getPessoa();
  }

  ngAfterViewInit() {
    this.navItemSettings();
  }

  navItemSettings(){
    [{link: this.feedRef, text:"Feed"},
     {link: this.meetingRef, text:"Reuniões"},
     {link: this.emailRef, text:"E-mail"},
     {link: "impressaoRelatorios", text:"Relatórios"},
     {link: `edicaoFeed/${this.pessoa.id}/0`, text:"Criar Feed"},
     {link: `edicaoReuniao/${this.pessoa.id}/0`, text:"Criar Reunião"},
     {link: `edicaoDados/${this.pessoa.id}`, text:"Edição de dados pessoais"}].forEach(item => {
       this.navItems.push(new NavigationItem(item.link, item.text));
     });
  }

  getPessoa(){
    this.pessoa = this.storage.getLoggedPerson();
    this.notification.getNotification();
  }

  getFeed(): void{
    this.feedService.getByDate(this.getToday()).subscribe(
      (resultFeed) => {
        this.feed = resultFeed;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getReuniao(): void{
    this.reuniaoService.getByDate(this.getToday(true)).subscribe(
      (resultReuniao) => {
        this.reuniao = resultReuniao;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  getToday(fullTime: boolean = false){
    var currentDate;

    if(fullTime){
      currentDate = this.today.getFullYear() + "-"
                    + (this.today.getMonth() + 1)  + "-"
                    + this.today.getDate() + " "
                    + this.today.getHours() + ":"
                    + this.today.getMinutes() + ":"
                    + this.today.getSeconds();
    }
    else{
      currentDate = this.today.getFullYear() + "-"
                    + (this.today.getMonth() + 1)  + "-"
                    + this.today.getDate();
    }

    return currentDate;
  }

  getDateReuniao(){
    var todayFormated = new Date();
    var dd = String(todayFormated.getDate()).padStart(2, '0');
    var mm = String(todayFormated.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todayFormated.getFullYear();

    var todayFormatedString = dd + '/' + mm + '/' + yyyy;
    return todayFormatedString;
  }

  edicaoFeed(feedId: number){
    this.router.navigate([`../edicaoFeed/${this.pessoa.id}/${feedId}`]);
  }

  deletarFeed(feedId: number, index: number){
    this.feedService.delete(feedId).subscribe(
      () => {
        this.feed.splice(index, 1)
        this.notification.popNotification('Feed deletado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edicaoReuniao(feedId: number){
    this.router.navigate([`../edicaoReuniao/${this.pessoa.id}/${feedId}`]);
  }

  deletarReuniao(reuniaoId: number, index: number){
    this.reuniaoService.delete(reuniaoId).subscribe(
      () => {
        this.reuniao.splice(index, 1);
        this.notification.popNotification('Reunião deletada com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public enviarEmail(){
    this.emailService.enviarEmail(new Email(this.destinatario, this.assunto, this.textoEmail)).subscribe(
      (resultEmail) => {
        this.limparCamposEmail();
        this.notification.popNotification('E-mail enviado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public limparCamposEmail(){
    this.destinatario = '';
    this.assunto = '';
    this.textoEmail = '';
  }
}
