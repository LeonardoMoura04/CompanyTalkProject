using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Models
{
    public class Email
    {

        public Email() { }

        public Email(string destinatario, string assunto, string textoEmail, string remetente, string senha)
        {
            Destinatario = destinatario;
            Assunto = assunto;
            TextoEmail = textoEmail;
            Remetente = remetente;
            Senha = senha;
        }

        public string Destinatario { get; set; }
        public string Assunto { get; set; }
        public string TextoEmail { get; set; }
        public string Remetente { get; set; }
        public string Senha { get; set; }

    }
}
