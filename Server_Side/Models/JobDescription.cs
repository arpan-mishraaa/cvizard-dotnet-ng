using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_Side.Models
{
    public class JobDescription
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public string? Title { get; set; }

        public string? Text { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        public virtual ICollection<Analysis> Analyses { get; set; } = new List<Analysis>();
    }
}