using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_Side.Models
{
    public class LatexOutput
    {
        public int Id { get; set; }

        [Required]
        public int AnalysisId { get; set; }

        public string? LatexText { get; set; }

        public string? PdfPath { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("AnalysisId")]
        public virtual Analysis Analysis { get; set; } = null!;
    }
}