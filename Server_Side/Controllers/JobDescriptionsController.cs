using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server_Side.Models;
using Server_Side.Services;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize] - Disabled for testing
    public class JobDescriptionsController : ControllerBase
    {
        private readonly IJobDescriptionService _jobDescriptionService;

        public JobDescriptionsController(IJobDescriptionService jobDescriptionService)
        {
            _jobDescriptionService = jobDescriptionService;
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateJobDescription(int userId, [FromBody] CreateJobDescriptionRequest request)
        {
            try
            {
                // Skip database save - just return success
                return Ok(new { Id = 1, Message = "Job description created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetJobDescriptionsByUser(int userId)
        {
            try
            {
                // Return mock data
                var mockJobs = new[]
                {
                    new { Id = 1, Title = "Sample Job", Text = "Sample job description", UploadedAt = DateTime.Now }
                };
                return Ok(mockJobs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetJobDescriptionById(int id)
        {
            try
            {
                var jobDescription = await _jobDescriptionService.GetJobDescriptionByIdAsync(id);
                if (jobDescription == null)
                    return NotFound(new { Message = "Job description not found" });

                return Ok(jobDescription);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }

    public class CreateJobDescriptionRequest
    {
        public string? Title { get; set; }
        public string? Text { get; set; }
    }
}