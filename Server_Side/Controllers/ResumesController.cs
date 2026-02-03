using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server_Side.Models;
using Server_Side.Services;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumesController : ControllerBase
    {
        private readonly IResumeService _resumeService;

        public ResumesController(IResumeService resumeService)
        {
            _resumeService = resumeService;
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> UploadResumeText(int userId, [FromBody] UploadResumeRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.ParsedText))
                    return BadRequest(new { Message = "No text provided." });

                return Ok(new { Id = 1, Message = "Resume processed successfully", ParsedText = request.ParsedText });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetResumesByUser(int userId)
        {
            try
            {
                var mockResumes = new[]
                {
                    new { Id = 1, FileName = "Sample Resume.pdf", UploadedAt = DateTime.Now, ParsedText = "Sample resume content" }
                };
                return Ok(mockResumes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }

    public class UploadResumeRequest
    {
        public string FileName { get; set; } = string.Empty;
        public string ParsedText { get; set; } = string.Empty;
        public string Metadata { get; set; } = string.Empty;
    }
}
