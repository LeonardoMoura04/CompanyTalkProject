using CompanyTalk_WebApi_v2.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Data
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;

        public Repository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (_context.SaveChanges() > 0);
        }

        #region Joins

        public IQueryable<Pessoa> IncludeJoinPessoa(IQueryable<Pessoa> query)
        {
            query = query.Include(x => x.Departamento);
            query = query.Include(x => x.Funcao);

            return query;
        }

        public IQueryable<Feed> IncludeJoinFeed(IQueryable<Feed> query)
        {
            query = query.Include(p => p.Pessoa);

            return query;
        }

        public IQueryable<Reuniao> IncludeJoinReuniao(IQueryable<Reuniao> query)
        {
            query = query.Include(p => p.Pessoa);

            return query;
        }

        public IQueryable<LogEntrada> IncludeJoinLogEntrada(IQueryable<LogEntrada> query)
        {
            query = query.Include(p => p.Pessoa);

            return query;
        }

        #endregion

        #region Departamento

        public async Task<Departamento[]> GetAllDepartamentosAsync()
        {
            IQueryable<Departamento> query = _context.Departamento;
            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Departamento> GetDepartamentoByIdAsync(int departamentoId)
        {
            IQueryable<Departamento> query = _context.Departamento;
            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Id == departamentoId);

            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region Função

        public async Task<Funcao[]> GetAllFuncoesAsync()
        {
            IQueryable<Funcao> query = _context.Funcao;
            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Funcao> GetFuncaoByIdAsync(int funcaoId)
        {
            IQueryable<Funcao> query = _context.Funcao;
            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Id == funcaoId);

            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region Pessoa

        public async Task<Pessoa[]> GetAllPessoasAsync(bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Pessoa> GetPessoaByIdAsync(int pessoaId, bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Id == pessoaId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Pessoa> GetPessoaByCpfAsync(string cpf, bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Cpf == cpf);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Pessoa[]> GetPessoasByDepartamentoIdAsync(int departamentoId, bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.departamentoId == departamentoId);

            return await query.ToArrayAsync();
        }

        public async Task<Pessoa[]> GetPessoasByFuncaoIdAsync(int funcaoId, bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.funcaoId == funcaoId);

            return await query.ToArrayAsync();
        }

        public async Task<Pessoa> LoginAsync(string cpf, string senha, bool includeJoins = false)
        {
            IQueryable<Pessoa> query = _context.Pessoa;

            if (includeJoins) query = IncludeJoinPessoa(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Cpf == cpf && y.Senha == senha);

            return await query.FirstOrDefaultAsync();
        }

        #endregion

        #region Feed

        public async Task<Feed[]> GetAllFeedsAsync(bool includePessoa = false)
        {
            IQueryable<Feed> query = _context.Feed;

            if (includePessoa) query = IncludeJoinFeed(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Feed> GetFeedByIdAsync(int feedId, bool includePessoa = false)
        {
            IQueryable<Feed> query = _context.Feed;

            if (includePessoa) query = IncludeJoinFeed(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.Id == feedId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Feed[]> GetFeedsByDateAsync(string dataPublicacao, bool includePessoa = false)
        {
            IQueryable<Feed> query = _context.Feed;

            if (includePessoa) query = IncludeJoinFeed(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id)
                         .Where(y => y.DataPublicacao == Convert.ToDateTime(dataPublicacao).ToString("dd/MM/yyyy"));

            return await query.ToArrayAsync();
        }

        #endregion

        #region Reunião

        public async Task<Reuniao[]> GetAllReunioesAsync(bool includePessoa = false)
        {
            IQueryable<Reuniao> query = _context.Reuniao;

            if (includePessoa) query = IncludeJoinReuniao(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.HorarioReuniaoInicio);

            return await query.ToArrayAsync();
        }

        public async Task<Reuniao> GetReuniaoByIdAsync(int reuniaoId, bool includePessoa = false)
        {
            IQueryable<Reuniao> query = _context.Reuniao;

            if (includePessoa) query = IncludeJoinReuniao(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.HorarioReuniaoInicio)
                         .Where(y => y.Id == reuniaoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Reuniao[]> GetReunioesByDateAsync(string dataReuniao, bool includePessoa = false)
        {
            IQueryable<Reuniao> query = _context.Reuniao;

            if (includePessoa) query = IncludeJoinReuniao(query);

            query = query.AsNoTracking()
                         .OrderBy(x => x.HorarioReuniaoInicio)
                         .Where(y => y.DataReuniao == Convert.ToDateTime(dataReuniao).ToString("dd/MM/yyyy"));

            return await query.ToArrayAsync();
        }

        #endregion

        #region LogEntrada

        public async Task<LogEntrada[]> GetAllLogsEntradaAsync(int rowNumber = 0, bool includePessoa = false)
        {
            IQueryable<LogEntrada> query = _context.LogEntrada;

            if (includePessoa) query = IncludeJoinLogEntrada(query);

            if (rowNumber != 0)
            {
                //Colocar aqui depois
            }

            query = query.AsNoTracking()
                         .OrderBy(x => x.Id);

            return await query.ToArrayAsync();
        }

        #endregion

    }
}
