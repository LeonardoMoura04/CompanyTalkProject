using System;
using System.Collections.Generic;

namespace CompanyTalk_WebApi_v2.Models
{
    public class Reuniao
    {
        public Reuniao() { }

        public Reuniao(int id, string assunto, string corpoReunioes, string dataReuniao, string horarioReuniaoInicio, string dataReuniaoFinal, string horarioReuniaoFinal, int pessoaId)
        {
            Id = id;
            Assunto = assunto;
            CorpoReunioes = corpoReunioes;
            DataReuniao = dataReuniao;
            HorarioReuniaoInicio = horarioReuniaoInicio;
            HorarioReuniaoFinal = horarioReuniaoFinal;
            PessoaId = pessoaId;
        }

        public int Id { get; set; }
        public string Assunto { get; set; }
        public string CorpoReunioes { get; set; }
        public string DataReuniao { get; set; }
        public string HorarioReuniaoInicio { get; set; }
        public string HorarioReuniaoFinal { get; set; }
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }
    }
}