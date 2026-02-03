using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Server_Side.Data;
using Server_Side.Models;
using System.Data;

namespace Server_Side.Services
{
    public interface IResumeService
    {
        Task<int> AddResumeAsync(Resume resume);
        Task<IEnumerable<Resume>> GetResumesByUserAsync(int userId);
        Task<Resume?> GetResumeByIdAsync(int id);
    }

    public class ResumeService : IResumeService
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public ResumeService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _connectionString = config.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("DefaultConnection");
        }

        // POST - Dapper
        public async Task<int> AddResumeAsync(Resume resume)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = @"INSERT INTO Resumes (UserId, FileName, ParsedText, Metadata, UploadedAt) 
                          VALUES (@UserId, @FileName, @ParsedText, @Metadata, @UploadedAt);
                          SELECT LAST_INSERT_ID();";
            
            var id = await db.QuerySingleAsync<int>(sql, new {
                UserId = resume.UserId,
                FileName = resume.FileName,
                ParsedText = resume.ParsedText,
                Metadata = resume.Metadata,
                UploadedAt = resume.UploadedAt
            });
            
            return id;
        }

        // GET - Dapper
        public async Task<IEnumerable<Resume>> GetResumesByUserAsync(int userId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM Resumes WHERE UserId = @UserId ORDER BY UploadedAt DESC";
            return await db.QueryAsync<Resume>(sql, new { UserId = userId });
        }

        public async Task<Resume?> GetResumeByIdAsync(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM Resumes WHERE Id = @Id";
            return await db.QueryFirstOrDefaultAsync<Resume>(sql, new { Id = id });
        }
    }
}
