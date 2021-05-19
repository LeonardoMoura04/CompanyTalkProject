using CompanyTalk_WebApi_v2.Data;
using CompanyTalk_WebApi_v2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using CompanyTalk_WebApi_v2.Business;
using CompanyTalk_WebApi_v2.Parameters;

namespace CompanyTalk_WebApi_v2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IRepository _repo;
        private PessoaBusiness pessoaBusiness;

        public PessoaController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllPessoasAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ById/{pessoaId}")]
        public async Task<IActionResult> GetPessoasById(int pessoaId)
        {
            try
            {
                var result = await _repo.GetPessoaByIdAsync(pessoaId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ByCpf/{cpf}")]
        public async Task<IActionResult> GetPessoasByCpf(string cpf)
        {
            try
            {
                var result = await _repo.GetPessoaByCpfAsync(cpf, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ByDepartmento/{departamentoId}")]
        public async Task<IActionResult> GetPessoasByDepartamentoId(int departamentoId)
        {
            try
            {
                var result = await _repo.GetPessoasByDepartamentoIdAsync(departamentoId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ByFuncao/{funcaoId}")]
        public async Task<IActionResult> GetPessoasByFuncaoId(int funcaoId)
        {
            try
            {
                var result = await _repo.GetPessoasByFuncaoIdAsync(funcaoId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginParameters loginParameters)
        {
            try
            {
                var result = await _repo.GetPessoaByCpfAsync(loginParameters.Cpf, true);
                var senhaBanco = result.Senha;

                if(senhaBanco == PessoaBusiness.GenerateSHA256Hash(loginParameters.Senha, result.Salt)) return Ok(result);
                else return this.Unauthorized();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Pessoa model)
        {
            try
            {
                string salt = PessoaBusiness.CreateSalt(12);

                model.Senha = PessoaBusiness.GenerateSHA256Hash(model.Senha, salt);
                model.Salt = salt;

                _repo.Add(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpPut("{pessoaId}")]
        public async Task<IActionResult> Put(int pessoaId, Pessoa model)
        {
            try
            {
                var pessoa = await _repo.GetPessoaByIdAsync(pessoaId);
                if (pessoa == null) return NotFound();

                model.Salt = PessoaBusiness.CreateSalt(12);
                model.Senha = PessoaBusiness.GenerateSHA256Hash(model.Senha, model.Salt);

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpPut("desativar-ativar/{pessoaId}")]
        public async Task<IActionResult> DesativarPessoa(int pessoaId, Pessoa model)
        {
            try
            {
                var pessoa = await _repo.GetPessoaByIdAsync(pessoaId);
                if (pessoa == null) return NotFound();

                if (model.Ativo) model.Ativo = false;
                else model.Ativo = true;

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpDelete("{pessoaId}")]
        public async Task<IActionResult> Delete(int pessoaId)
        {
            try
            {
                var pessoa = await _repo.GetPessoaByIdAsync(pessoaId);
                if (pessoa == null) return NotFound();

                _repo.Delete(pessoa);

                if (await _repo.SaveChangesAsync()) return Ok("Deletado com sucesso!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }
    }
}
