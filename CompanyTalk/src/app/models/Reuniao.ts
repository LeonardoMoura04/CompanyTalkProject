import { Pessoa } from './Pessoa';

export class Reuniao {
  id!: number;
  assunto!: string;
  corpoReunioes!: string;
  dataReuniao!: string;
  horarioReuniaoInicio!: string;
  horarioReuniaoFinal!: string;
  pessoaId!: number;
  pessoa!: Pessoa;
}
