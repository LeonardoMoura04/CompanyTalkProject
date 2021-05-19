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
    public class FeedController : ControllerBase
    {
        private readonly IRepository _repo;

        public FeedController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllFeedsAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ById/{feedId}")]
        public async Task<IActionResult> GetFeedsById(int feedId)
        {
            try
            {
                var result = await _repo.GetFeedByIdAsync(feedId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpGet("ByDate/{dataFeedInicio}")]
        public async Task<IActionResult> GetFeedsByDate(string dataFeedInicio)
        {
            try
            {
                var result = await _repo.GetFeedsByDateAsync(dataFeedInicio, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Feed model)
        {
            try
            {
                if(model != null) _repo.Add(model);
                else return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: variável model não foi declarada. Ela está nula.");

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpPut("{feedId}")]
        public async Task<IActionResult> Put(int feedId, Feed model)
        {
            try
            {
                var feed = await _repo.GetFeedByIdAsync(feedId);
                if (feed == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync()) return Ok(model);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O banco de dados falhou. Erro: " + ex.Message);
            }

            return BadRequest("Erro não esperado.");
        }

        [HttpDelete("{feedId}")]
        public async Task<IActionResult> Delete(int feedId)
        {
            try
            {
                var feed = await _repo.GetFeedByIdAsync(feedId);
                if (feed == null) return NotFound();

                _repo.Delete(feed);

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
