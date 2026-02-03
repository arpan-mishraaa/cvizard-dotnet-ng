using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Server_Side.Data;
using Server_Side.Models;
using System.Data;

namespace Server_Side.Services
{
    public interface IAnalysisService
    {
        Task<int> AddAnalysisAsync(Analysis analysis);
        Task<IEnumerable<AnalysisResult>> GetAnalysesByUserAsync(int userId);
        Task<Analysis?> GetAnalysisByIdAsync(int id);
    }

    public class AnalysisService : IAnalysisService
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public AnalysisService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _connectionString = config.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("DefaultConnection");
        }

        // POST - EF Core
        public async Task<int> AddAnalysisAsync(Analysis analysis)
        {
            _context.Analyses.Add(analysis);
            await _context.SaveChangesAsync();
            return analysis.Id;
        }

        // GET - Dapper with JOIN
        public async Task<IEnumerable<AnalysisResult>> GetAnalysesByUserAsync(int userId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = @"
                SELECT a.Id, a.ResumeId, a.JobDescriptionId, a.AtsScore, 
                       a.SuggestionsJson, a.AiResponseJson, a.CreatedAt,
                       r.FileName as ResumeFileName, jd.Title as JobTitle
                FROM Analyses a
                INNER JOIN Resumes r ON a.ResumeId = r.Id
                INNER JOIN JobDescriptions jd ON a.JobDescriptionId = jd.Id
                WHERE r.UserId = @UserId
                ORDER BY a.CreatedAt DESC";
            return await db.QueryAsync<AnalysisResult>(sql, new { UserId = userId });
        }

        public async Task<Analysis?> GetAnalysisByIdAsync(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM Analyses WHERE Id = @Id";
            return await db.QueryFirstOrDefaultAsync<Analysis>(sql, new { Id = id });
        }
    }
}