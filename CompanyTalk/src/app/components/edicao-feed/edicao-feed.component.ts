import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feed } from 'src/app/models/Feed';
import { Pessoa } from 'src/app/models/Pessoa';
import { FeedService } from 'src/app/service/feed.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import { NavigationItem } from '../navi/navi.component';

@Component({
  selector: 'app-edicao-feed',
  templateUrl: './edicao-feed.component.html',
  styleUrls: ['./edicao-feed.component.css']
})
export class EdicaoFeedComponent implements OnInit, AfterViewInit {

  @ViewChild("criacaoRef") criacaoRef!: ElementRef;
  @ViewChild("edicaoRef") edicaoRef!: ElementRef;

  public feedId!: number;
  public feed!: Feed;
  public pessoaId!: number;

  public feedTitle!: string;
  public feedText!: string;
  public feedImage!: string;

  public feedTitleAlterar!: string;
  public feedTextAlterar!: string;
  public feedImageAlterar!: string;

  public pessoa!: Pessoa;

  public today = new Date();

  public navItems: Array<NavigationItem> = new Array<NavigationItem>();

  constructor(private router: ActivatedRoute,
              private feedService: FeedService,
              private notification: NotificationService,
              private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.feedId = this.router.snapshot.params.feedId;
    this.pessoaId = this.router.snapshot.params.pessoaId;
    this.pessoa = this.storage.getLoggedPerson();
    if(this.pessoa.departamento.id != 2){
      this.notification.popNotification('Você não tem permissão para fazer alterações nesta página, por favor, entre em contato com o departamento tecnológico.')
    }
    if(this.feedId != 0){
      this.getFeed(this.feedId);
    }
  }

  ngAfterViewInit() {
    this.navItemSettings();
  }

  navItemSettings(){
    [{link: "dashboard", text:"Home"},
      {link: this.criacaoRef, text:"Criação de feed"},
      {link: this.edicaoRef, text:"Edição do feed"}].forEach(item => {
      this.navItems.push(new NavigationItem(item.link, item.text));
    });
  }

  getFeed(feedId: number): void{
    this.feedService.getById(feedId).subscribe(
      (resultFeed) => {
        this.feed = resultFeed;
        if(this.feedId != 0) this.preencherEditar(this.feed);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  preencherEditar(feedPreenchido: Feed){
    this.feedTitleAlterar = feedPreenchido.titulo;
    this.feedImageAlterar = feedPreenchido.linkImagem;
    this.feedTextAlterar = feedPreenchido.corpoFeed;
  }

  criarFeed(){
    this.feed = new Feed();

    this.feed.titulo = this.feedTitle;
    this.feed.linkImagem = this.feedImage;
    this.feed.corpoFeed = this.feedText;
    this.feed.dataPublicacao = this.getDateTodayFormated();
    this.feed.pessoaId = this.pessoaId;

    this.feedService.post(this.feed).subscribe(
      () => {
        this.notification.popNotification('Feed criado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )
  }

  alterarFeed(){
    this.getFeed(this.feedId);

    this.feed.id = this.feedId;
    this.feed.titulo = this.feedTitleAlterar;
    this.feed.linkImagem = this.feedImageAlterar;
    this.feed.corpoFeed = this.feedTextAlterar;

    this.feedService.put(this.feed).subscribe(
      () => {
        this.notification.popNotification('Feed alterado com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )
  }

  limparCampos(isCriar: boolean = false){
    if(isCriar){
      this.feedTitle = '';
      this.feedImage = '';
      this.feedText = '';
    }
    else{
      this.feedTitleAlterar = '';
      this.feedImageAlterar = '';
      this.feedTextAlterar = '';
    }
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

  getDateTodayFormated(){
    var todayFormated = new Date();
    var dd = String(todayFormated.getDate()).padStart(2, '0');
    var mm = String(todayFormated.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todayFormated.getFullYear();

    var todayFormatedString = dd + '/' + mm + '/' + yyyy;
    return todayFormatedString;
  }

}
