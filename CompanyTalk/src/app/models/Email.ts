export class Email {
  destinatario!: string
  assunto!: string
  textoEmail!: string
  remetente!: string
  senha!: string

  constructor(destinatario: string, assunto: string, textoEmail: string){
    this.destinatario = destinatario;
    this.assunto = assunto;
    this.textoEmail = textoEmail;
    this.remetente = 'companytalk2021@gmail.com';
    this.senha = 'companyTalk!2021';
  }
}
