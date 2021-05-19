import { Pessoa } from './Pessoa';

export class Feed {
  id!: number;
  titulo!: string;
  corpoFeed!: string;
  linkImagem!: string;
  dataPublicacao!: string;
  pessoaId!: number;
  pessoa!: Pessoa;
}
