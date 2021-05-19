using System;
using System.Collections.Generic;

namespace CompanyTalk_WebApi_v2.Models
{
    public class Departamento
    {
        public Departamento() { }
        public Departamento(int id, string nome)
        {
            this.Id = id;
            this.Nome = nome;
        }
        public int Id { get; set; }  
        public string Nome { get; set; }
    }
}