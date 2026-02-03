using System.ComponentModel.DataAnnotations;

namespace Server_Side.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Resume> Resumes { get; set; } = new List<Resume>();
        public virtual ICollection<JobDescription> JobDescriptions { get; set; } = new List<JobDescription>();
    }
}