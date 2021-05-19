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
    public class ReuniaoController : ControllerBase
    {
        private readonly IRepository _repo;

        public ReuniaoController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllReunioesAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ById/{reuniaoId}")]
        public async Task<IActionResult> GetReuniaosById(int reuniaoId)
        {
            try
            {
                var result = await _repo.GetReuniaoByIdAsync(reuniaoId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ByDate/{dataReuniaoInicio}")]
        public async Task<IActionResult> GetReunioesByDate(string dataReuniaoInicio)
        {
            try
            {
                var result = await _repo.GetReunioesByDateAsync(dataReuniaoInicio, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Reuniao model)
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

        [HttpPut("{reuniaoId}")]
        public async Task<IActionResult> Put(int reuniaoId, Reuniao model)
        {
            try
            {
                var reuniao = await _repo.GetReuniaoByIdAsync(reuniaoId);
                if (reuniao == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpDelete("{reuniaoId}")]
        public async Task<IActionResult> Delete(int reuniaoId)
        {
            try
            {
                var reuniao = await _repo.GetReuniaoByIdAsync(reuniaoId);
                if (reuniao == null) return NotFound();

                _repo.Delete(reuniao);

                if (await _repo.SaveChangesAsync()) return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }
    }
}
