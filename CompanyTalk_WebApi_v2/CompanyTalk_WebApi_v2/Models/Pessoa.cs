using System;
using System.Collections.Generic;

namespace CompanyTalk_WebApi_v2.Models
{
    public class Pessoa
    {
        public Pessoa() { }
        public Pessoa(int id, string cpf, string nome, string sexo, string dataNascimento, string telefone, string email, 
                      int id_funcao, int id_departamento, string senha, string salt, bool ativo)
        {
            Id = id;
            Cpf = cpf;
            Nome = nome;
            Sexo = sexo;
            DataNascimento = dataNascimento;
            Telefone = telefone;
            Email = email;
            funcaoId = id_funcao;
            departamentoId = id_departamento;
            Senha = senha;
            Salt = salt;
            Ativo = ativo;
        }
        
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string Nome { get; set; }
        public string Sexo { get; set; }
        public string DataNascimento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int funcaoId { get; set; }
        public int departamentoId { get; set; }
        public string Senha { get; set; }
        public string Salt { get; set; }
        public bool Ativo { get; set; } = true;
        public Departamento Departamento { get; set; }
        public Funcao Funcao { get; set; }
    }
}