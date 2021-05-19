import { Departamento } from './Departamento';
import { Funcao } from './Funcao';

export class Pessoa {
  id!: number;
  cpf!: string;
  nome!: string;
  sexo!: string;
  dataNascimento!: string;
  telefone!: string;
  email!: string;
  funcaoId!: number;
  departamentoId!: number;
  senha!: string;
  salt!: string;
  ativo!: boolean;
  departamento!: Departamento;
  funcao!: Funcao;
}
