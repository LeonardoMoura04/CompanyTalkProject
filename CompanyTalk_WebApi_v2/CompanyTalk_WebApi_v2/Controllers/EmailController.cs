using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using CompanyTalk_WebApi_v2.Models;

namespace CompanyTalk_WebApi_v2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : ControllerBase
    {
        #region E-mail

        [HttpPost]
        public async Task<IActionResult> EnviaMensagemEmail([FromBody] Email email)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(email.Remetente, email.Senha),
                    EnableSsl = true,
                };

                smtpClient.Send(email.Remetente, email.Destinatario, email.Assunto, email.TextoEmail);

                return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "O processo de envio de e-mail falhou. Erro: " + ex.Message);
            }
        }

        #endregion
    }
}
