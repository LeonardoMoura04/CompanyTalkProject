using CompanyTalk_WebApi_v2.Data;
using CompanyTalk_WebApi_v2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyTalk_WebApi_v2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartamentoController : ControllerBase
    {
        private readonly IRepository _repo;

        public DepartamentoController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllDepartamentosAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("{departamentoId}")]
        public async Task<IActionResult> GetDepartamentosById(int departamentoId)
        {
            try
            {
                var result = await _repo.GetDepartamentoByIdAsync(departamentoId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Departamento model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpPut("{departamentoId}")]
        public async Task<IActionResult> Put(int departamentoId, Departamento model)
        {
            try
            {
                var departamento = await _repo.GetDepartamentoByIdAsync(departamentoId);
                if (departamento == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpDelete("{departamentoId}")]
        public async Task<IActionResult> Delete(int departamentoId)
        {
            try
            {
                var departamento = await _repo.GetDepartamentoByIdAsync(departamentoId);
                if (departamento == null) return NotFound();

                _repo.Delete(departamento);

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
