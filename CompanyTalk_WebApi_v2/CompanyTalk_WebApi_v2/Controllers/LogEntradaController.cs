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
    public class LogEntradaController : ControllerBase
    {
        private readonly IRepository _repo;

        public LogEntradaController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{rowNumber}")]
        public async Task<IActionResult> Get(int rowNumber = 0)
        {
            try
            {
                var result = await _repo.GetAllLogsEntradaAsync(rowNumber, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LogEntrada model)
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
    }
}
