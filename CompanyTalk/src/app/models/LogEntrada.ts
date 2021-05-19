import { Pessoa } from "./Pessoa";

export class LogEntrada {
  id!: number;
  pessoaId!: number;
  dataLog!: string;
  horaLog!: string;
  pessoa!: Pessoa;

  constructor(pessoa: Pessoa, dataLog: string, horaLog: string){
    this.pessoaId = pessoa.id;
    this.dataLog = dataLog;
    this.horaLog = horaLog;
  }
}
