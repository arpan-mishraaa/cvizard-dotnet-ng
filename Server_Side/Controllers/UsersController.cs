using Microsoft.AspNetCore.Mvc;
using Server_Side.Models;
using Server_Side.Services;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            try
            {
                // Skip database - just return success
                return Ok(new { Message = "User registered successfully", UserId = 1 });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                // Skip database - return mock token
                return Ok(new { 
                    Token = "mock-jwt-token", 
                    Email = request.Email, 
                    UserId = 1 
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
