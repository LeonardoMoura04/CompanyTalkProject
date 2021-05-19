export class LoginParameters{
  public cpf!: string;
  public senha!: string;

  constructor(login: string, senha: string){
    this.cpf = login;
    this.senha = senha;
  }
}
