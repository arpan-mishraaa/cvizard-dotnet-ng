using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_Side.Models
{
    public class Resume
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string FileName { get; set; } = string.Empty;

        public string? ParsedText { get; set; }

        public string? Metadata { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        public virtual ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
    }
}