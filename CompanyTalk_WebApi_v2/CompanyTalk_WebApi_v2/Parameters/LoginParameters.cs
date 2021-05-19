using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Parameters
{
    public class LoginParameters
    {
        public LoginParameters() { }
        public LoginParameters(string cpf, string senha)
        {
            Cpf = cpf;
            Senha = senha;
        }

        public string Cpf { get; set; }
        public string Senha { get; set; }

    }
}
