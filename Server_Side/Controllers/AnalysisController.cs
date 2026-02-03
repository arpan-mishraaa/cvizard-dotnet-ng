using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server_Side.Models;
using Server_Side.Services;
using System.Text.Json;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize] - Disabled for testing
    public class AnalysisController : ControllerBase
    {
        private readonly IGeminiService _geminiService;
        private readonly IAnalysisService _analysisService;
        private readonly IResumeService _resumeService;
        private readonly IJobDescriptionService _jobDescriptionService;

        public AnalysisController(
            IGeminiService geminiService,
            IAnalysisService analysisService,
            IResumeService resumeService,
            IJobDescriptionService jobDescriptionService)
        {
            _geminiService = geminiService;
            _analysisService = analysisService;
            _resumeService = resumeService;
            _jobDescriptionService = jobDescriptionService;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] AnalysisRequest request)
        {
            try
            {
                var result = await _geminiService.AnalyzeResumeAsync(request.ResumeText, request.JobDescription);
                return Ok(new { Result = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("latex")]
        public async Task<IActionResult> GenerateLatex([FromBody] AnalysisRequest request)
        {
            try
            {
                var result = await _geminiService.GenerateLatexAsync(request.ResumeText, request.JobDescription);
                return Ok(new { LatexCode = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAnalysesByUser(int userId)
        {
            try
            {
                var analyses = await _analysisService.GetAnalysesByUserAsync(userId);
                return Ok(analyses);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetAnalysisById(int id)
        {
            try
            {
                var analysis = await _analysisService.GetAnalysisByIdAsync(id);
                if (analysis == null)
                    return NotFound(new { Message = "Analysis not found" });

                return Ok(analysis);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        private decimal? ExtractAtsScore(string aiResponse)
        {
            // Simple extraction logic - you can enhance this
            try
            {
                if (aiResponse.Contains("ATS Score:"))
                {
                    var scoreText = aiResponse.Split("ATS Score:")[1].Split('%')[0].Trim();
                    if (decimal.TryParse(scoreText, out decimal score))
                        return score;
                }
            }
            catch
            {
                // Ignore parsing errors
            }
            return null;
        }
    }

    public class AnalysisRequest
    {
        public int ResumeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string ResumeText { get; set; } = string.Empty;
        public string JobDescription { get; set; } = string.Empty;
    }
}

