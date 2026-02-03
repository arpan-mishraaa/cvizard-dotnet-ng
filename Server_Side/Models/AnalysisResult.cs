namespace Server_Side.Models
{
    public class AnalysisResult
    {
        public int Id { get; set; }
        public int ResumeId { get; set; }
        public int JobDescriptionId { get; set; }
        public decimal? AtsScore { get; set; }
        public string? SuggestionsJson { get; set; }
        public string? AiResponseJson { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ResumeFileName { get; set; }
        public string? JobTitle { get; set; }
    }
}