using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Server_Side.Data;
using Server_Side.Models;
using System.Data;

namespace Server_Side.Services
{
    public interface IJobDescriptionService
    {
        Task<int> AddJobDescriptionAsync(JobDescription jobDescription);
        Task<IEnumerable<JobDescription>> GetJobDescriptionsByUserAsync(int userId);
        Task<JobDescription?> GetJobDescriptionByIdAsync(int id);
    }

    public class JobDescriptionService : IJobDescriptionService
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public JobDescriptionService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _connectionString = config.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("DefaultConnection");
        }

        // POST - EF Core
        public async Task<int> AddJobDescriptionAsync(JobDescription jobDescription)
        {
            _context.JobDescriptions.Add(jobDescription);
            await _context.SaveChangesAsync();
            return jobDescription.Id;
        }

        // GET - Dapper
        public async Task<IEnumerable<JobDescription>> GetJobDescriptionsByUserAsync(int userId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM JobDescriptions WHERE UserId = @UserId ORDER BY UploadedAt DESC";
            return await db.QueryAsync<JobDescription>(sql, new { UserId = userId });
        }

        public async Task<JobDescription?> GetJobDescriptionByIdAsync(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM JobDescriptions WHERE Id = @Id";
            return await db.QueryFirstOrDefaultAsync<JobDescription>(sql, new { Id = id });
        }
    }
}