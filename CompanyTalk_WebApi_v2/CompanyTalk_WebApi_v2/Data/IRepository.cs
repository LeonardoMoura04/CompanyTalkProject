using CompanyTalk_WebApi_v2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // Departamento
        Task<Departamento[]> GetAllDepartamentosAsync();
        Task<Departamento> GetDepartamentoByIdAsync(int departmentId);

        // Função
        Task<Funcao[]> GetAllFuncoesAsync();
        Task<Funcao> GetFuncaoByIdAsync(int funcaoId);

        // Pessoa
        Task<Pessoa[]> GetAllPessoasAsync(bool includeJoins = false);
        Task<Pessoa> GetPessoaByIdAsync(int pessoaId, bool includeJoins = false);
        Task<Pessoa> GetPessoaByCpfAsync(string cpf, bool includeJoins = false);
        Task<Pessoa[]> GetPessoasByDepartamentoIdAsync(int departamentoId, bool includeJoins = false);
        Task<Pessoa[]> GetPessoasByFuncaoIdAsync(int funcaoId, bool includeJoins = false);
        Task<Pessoa> LoginAsync(string cpf, string senha, bool includeJoins = false);

        // Feed
        Task<Feed[]> GetAllFeedsAsync(bool includePessoa = false);
        Task<Feed> GetFeedByIdAsync(int feedId, bool includePessoa = false);
        Task<Feed[]> GetFeedsByDateAsync(string dataPublicacao, bool includePessoa = false);

        // Reunião
        Task<Reuniao[]> GetAllReunioesAsync(bool includePessoa = false);
        Task<Reuniao> GetReuniaoByIdAsync(int reuniaoId, bool includePessoa = false);
        Task<Reuniao[]> GetReunioesByDateAsync(string dataReuniao, bool includePessoa = false);

        // LogEntrada
        Task<LogEntrada[]> GetAllLogsEntradaAsync(int rowNumber = 0, bool includePessoa = false);
    }
}
