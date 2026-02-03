using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server_Side.Models;
using Server_Side.Services;

namespace Server_Side.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LatexOutputsController : ControllerBase
    {
        private readonly ILatexOutputService _latexOutputService;

        public LatexOutputsController(ILatexOutputService latexOutputService)
        {
            _latexOutputService = latexOutputService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLatexOutput([FromBody] CreateLatexOutputRequest request)
        {
            try
            {
                var latexOutput = new LatexOutput
                {
                    AnalysisId = request.AnalysisId,
                    LatexText = request.LatexText,
                    PdfPath = request.PdfPath
                };

                var id = await _latexOutputService.AddLatexOutputAsync(latexOutput);
                return Ok(new { Id = id, Message = "LaTeX output created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("analysis/{analysisId}")]
        public async Task<IActionResult> GetLatexOutputsByAnalysis(int analysisId)
        {
            try
            {
                var latexOutputs = await _latexOutputService.GetLatexOutputsByAnalysisAsync(analysisId);
                return Ok(latexOutputs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLatexOutputById(int id)
        {
            try
            {
                var latexOutput = await _latexOutputService.GetLatexOutputByIdAsync(id);
                if (latexOutput == null)
                    return NotFound(new { Message = "LaTeX output not found" });

                return Ok(latexOutput);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }

    public class CreateLatexOutputRequest
    {
        public int AnalysisId { get; set; }
        public string? LatexText { get; set; }
        public string? PdfPath { get; set; }
    }
}