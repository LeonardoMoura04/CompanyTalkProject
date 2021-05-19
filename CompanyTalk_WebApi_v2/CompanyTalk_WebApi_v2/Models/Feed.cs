using System;
using System.Collections.Generic;

namespace CompanyTalk_WebApi_v2.Models
{
    public class Feed
    {
        public Feed() { }

        public Feed(int id, string titulo, string corpoFeed, string linkImagem, string dataPublicacao, int pessoaId)
        {
            this.Id = id;
            this.Titulo = titulo;
            this.CorpoFeed = corpoFeed;
            this.LinkImagem = linkImagem;
            this.DataPublicacao = dataPublicacao;
            this.PessoaId = pessoaId;
        }

        public int Id { get; set; }
        public string Titulo { get; set; }
        public string CorpoFeed { get; set; }
        public string LinkImagem { get; set; }
        public string DataPublicacao { get; set; }
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }
    }
}