using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Server_Side.Data;
using Server_Side.Models;
using System.Data;

namespace Server_Side.Services
{
    public interface ILatexOutputService
    {
        Task<int> AddLatexOutputAsync(LatexOutput latexOutput);
        Task<IEnumerable<LatexOutput>> GetLatexOutputsByAnalysisAsync(int analysisId);
        Task<LatexOutput?> GetLatexOutputByIdAsync(int id);
    }

    public class LatexOutputService : ILatexOutputService
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public LatexOutputService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _connectionString = config.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("DefaultConnection");
        }

        // POST - EF Core
        public async Task<int> AddLatexOutputAsync(LatexOutput latexOutput)
        {
            _context.LatexOutputs.Add(latexOutput);
            await _context.SaveChangesAsync();
            return latexOutput.Id;
        }

        // GET - Dapper
        public async Task<IEnumerable<LatexOutput>> GetLatexOutputsByAnalysisAsync(int analysisId)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM LatexOutputs WHERE AnalysisId = @AnalysisId ORDER BY CreatedAt DESC";
            return await db.QueryAsync<LatexOutput>(sql, new { AnalysisId = analysisId });
        }

        public async Task<LatexOutput?> GetLatexOutputByIdAsync(int id)
        {
            using IDbConnection db = new MySqlConnection(_connectionString);
            string sql = "SELECT * FROM LatexOutputs WHERE Id = @Id";
            return await db.QueryFirstOrDefaultAsync<LatexOutput>(sql, new { Id = id });
        }
    }
}