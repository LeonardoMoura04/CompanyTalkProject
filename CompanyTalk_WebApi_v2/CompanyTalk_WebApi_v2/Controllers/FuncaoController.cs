using CompanyTalk_WebApi_v2.Data;
using CompanyTalk_WebApi_v2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuncaoController : ControllerBase
    {
        private readonly IRepository _repo;

        public FuncaoController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllFuncoesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("{funcaoId}")]
        public async Task<IActionResult> GetFuncaosById(int funcaoId)
        {
            try
            {
                var result = await _repo.GetFuncaoByIdAsync(funcaoId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Funcao model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpPut("{funcaoId}")]
        public async Task<IActionResult> Put(int funcaoId, Funcao model)
        {
            try
            {
                var funcao = await _repo.GetFuncaoByIdAsync(funcaoId);
                if (funcao == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpDelete("{funcaoId}")]
        public async Task<IActionResult> Delete(int funcaoId)
        {
            try
            {
                var funcao = await _repo.GetFuncaoByIdAsync(funcaoId);
                if (funcao == null) return NotFound();

                _repo.Delete(funcao);

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
