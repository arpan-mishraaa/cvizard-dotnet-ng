using Mscc.GenerativeAI;
using System.Threading.Tasks;

namespace Server_Side.Services
{
    public interface IGeminiService
    {
        Task<string> AnalyzeResumeAsync(string resumeText, string jobDescription);
        Task<string> GenerateLatexAsync(string resumeText, string jobDescription);
    }

    public class GeminiService : IGeminiService
    {
        private readonly string _apiKey;

        private readonly ILogger<GeminiService>? _logger;

        public GeminiService(IConfiguration config, ILogger<GeminiService>? logger = null)
        {
            _apiKey = config["Gemini:ApiKey"] ?? throw new ArgumentNullException("Gemini:ApiKey is missing.");
            _logger = logger;
        }

        public async Task<string> AnalyzeResumeAsync(string resumeText, string jobDescription)
        {
            try
            {
                var googleAI = new GoogleAI(_apiKey);
                var model = googleAI.GenerativeModel("gemma-3-1b-it");
                
                var prompt = $@"Analyze this resume against the job description. Provide ATS_SCORE: [0-100] and brief analysis.

                RESUME: {resumeText}
                JOB: {jobDescription}";

                var response = await model.GenerateContent(prompt);
                return response?.Text ?? string.Empty;
            }
            catch (Exception ex)
            {
                return $"Analysis failed: {ex.Message}";
            }
        }

        public async Task<string> GenerateLatexAsync(string resumeText, string jobDescription)
        {
            try
            {
                var googleAI = new GoogleAI(_apiKey);
                var model = googleAI.GenerativeModel("gemma-3-1b-it");
                
                var prompt = $@"Generate LaTeX resume code based on:

                RESUME: {resumeText}
                JOB: {jobDescription}";

                var response = await model.GenerateContent(prompt);
                return response?.Text ?? string.Empty;
            }
            catch (Exception ex)
            {
                return $"LaTeX generation failed: {ex.Message}";
            }
        }
    }
}
