using Microsoft.AspNetCore.Mvc;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new 
            { 
                Status = "Healthy", 
                Timestamp = DateTime.UtcNow,
                Version = "1.0.0",
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"
            });
        }

        [HttpGet("database")]
        public async Task<IActionResult> CheckDatabase([FromServices] Data.AppDbContext context)
        {
            try
            {
                await context.Database.CanConnectAsync();
                return Ok(new { Status = "Database connection successful", Timestamp = DateTime.UtcNow });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Database connection failed", Error = ex.Message, Timestamp = DateTime.UtcNow });
            }
        }
    }
}