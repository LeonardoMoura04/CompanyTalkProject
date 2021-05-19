using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Models
{
    public class LogEntrada
    {
        public LogEntrada(int id, int pessoaId, string dataLog, string horaLog)
        {
            this.Id = id;
            this.PessoaId = pessoaId;
            this.DataLog = dataLog;
            this.HoraLog = horaLog;
        }
        public int Id { get; set; }
        public int PessoaId { get; set; }
        public string DataLog { get; set; }
        public string HoraLog { get; set; }
        public Pessoa Pessoa { get; set; }
    }
}
