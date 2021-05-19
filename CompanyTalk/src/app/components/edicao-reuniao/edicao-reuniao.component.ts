import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reuniao } from 'src/app/models/Reuniao';
import { NotificationService } from 'src/app/service/notification.service';
import { ReuniaoService } from 'src/app/service/reuniao.service';
import { SessionStorageService } from 'src/app/service/session-storage.service';
import { NavigationItem } from '../navi/navi.component';

@Component({
  selector: 'app-edicao-reuniao',
  templateUrl: './edicao-reuniao.component.html',
  styleUrls: ['./edicao-reuniao.component.css']
})
export class EdicaoReuniaoComponent implements OnInit, AfterViewInit {

  @ViewChild("criacaoRef") criacaoRef!: ElementRef;
  @ViewChild("edicaoRef") edicaoRef!: ElementRef;

  public reuniaoId!: number;
  public reuniao!: Reuniao;
  public pessoaId!: number;

  public reuniaoAssunto!: string;
  public reuniaoData!: string;
  public reuniaoHoraInicio!: string;
  public reuniaoHoraFinal!: string;
  public reuniaoTexto!: string;

  public reuniaoAssuntoAlterar!: string;
  public reuniaoDataAlterar!: string;
  public reuniaoHoraInicioAlterar!: string;
  public reuniaoHoraFinalAlterar!: string;
  public reuniaoTextoAlterar!: string;

  public today = new Date();

  public navItems: Array<NavigationItem> = new Array<NavigationItem>();

  constructor(private router: ActivatedRoute,
              private reuniaoService: ReuniaoService,
              private notification: NotificationService,
              private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.reuniaoId = this.router.snapshot.params.reuniaoId;
    this.pessoaId = this.router.snapshot.params.pessoaId;
    if(this.reuniaoId != 0){
      this.getReuniao(this.reuniaoId);
    }
  }

  ngAfterViewInit() {
    this.navItemSettings();
  }

  navItemSettings(){
    [{link: "dashboard", text:"Home"},
      {link: this.criacaoRef, text:"Criação de reuniao"},
      {link: this.edicaoRef, text:"Edição do reuniao"}].forEach(item => {
      this.navItems.push(new NavigationItem(item.link, item.text));
    });
  }

  getReuniao(reuniaoId: number): void{
    this.reuniaoService.getById(reuniaoId).subscribe(
      (resultReuniao) => {
        this.reuniao = resultReuniao;
        if(this.reuniaoId != 0) this.preencherEditar(this.reuniao);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  preencherEditar(reuniaoPreenchido: Reuniao){
    this.reuniaoAssuntoAlterar = reuniaoPreenchido.assunto;
    this.reuniaoDataAlterar = reuniaoPreenchido.dataReuniao;
    this.reuniaoHoraInicioAlterar = reuniaoPreenchido.horarioReuniaoInicio;
    this.reuniaoHoraFinalAlterar = reuniaoPreenchido.horarioReuniaoFinal;
    this.reuniaoTextoAlterar = reuniaoPreenchido.corpoReunioes;
  }

  criarReuniao(){
    this.reuniao = new Reuniao();

    this.reuniao.assunto = this.reuniaoAssunto;
    this.reuniao.dataReuniao = this.reuniaoData;
    this.reuniao.horarioReuniaoInicio = this.reuniaoHoraInicio;
    this.reuniao.horarioReuniaoFinal = this.reuniaoHoraFinal;
    this.reuniao.corpoReunioes = this.reuniaoTexto;
    this.reuniao.pessoaId = this.pessoaId;

    this.reuniaoService.post(this.reuniao).subscribe(
      () => {
        this.notification.popNotification('Reunião criada com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )
  }

  alterarReuniao(){
    this.getReuniao(this.reuniaoId);

    this.reuniao.id = this.reuniaoId;
    this.reuniao.assunto = this.reuniaoAssuntoAlterar;
    this.reuniao.dataReuniao = this.reuniaoDataAlterar;
    this.reuniao.horarioReuniaoInicio = this.reuniaoHoraInicioAlterar;
    this.reuniao.horarioReuniaoFinal = this.reuniaoHoraFinalAlterar;
    this.reuniao.corpoReunioes = this.reuniaoTextoAlterar;

    this.reuniaoService.put(this.reuniao).subscribe(
      () => {
        this.notification.popNotification('Reunião alterada com sucesso!');
      },
      (error) => {
        console.error(error);
      }
    )


  }

  limparCampos(isCriar: boolean = false){
    if(isCriar){
      this.reuniaoAssunto = '';
      this.reuniaoData = '';
      this.reuniaoHoraInicio = '';
      this.reuniaoHoraFinal = '';
      this.reuniaoTexto = '';
    }
    else{
      this.reuniaoAssuntoAlterar = '';
      this.reuniaoDataAlterar = '';
      this.reuniaoHoraInicioAlterar = '';
      this.reuniaoHoraFinalAlterar = '';
      this.reuniaoTextoAlterar = '';
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
