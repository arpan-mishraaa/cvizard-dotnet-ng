using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_Side.Models
{
    public class Analysis
    {
        public int Id { get; set; }

        [Required]
        public int ResumeId { get; set; }

        [Required]
        public int JobDescriptionId { get; set; }

        public decimal? AtsScore { get; set; }

        public string? SuggestionsJson { get; set; }

        public string? AiResponseJson { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("ResumeId")]
        public virtual Resume Resume { get; set; } = null!;

        [ForeignKey("JobDescriptionId")]
        public virtual JobDescription JobDescription { get; set; } = null!;

        public virtual ICollection<LatexOutput> LatexOutputs { get; set; } = new List<LatexOutput>();
    }
}