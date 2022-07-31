using Api.Interfaces;
using Api.Models;
using Api.Data;
using Data.Repositories;
using Api.Pagination;
using Microsoft.EntityFrameworkCore;
using Dapper;

namespace Api.Repositories;

public class ProdutoRepository : Repository<Produto>, IProdutoRepository
{
    public ProdutoRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<PagedResult<Produto>> ObterComDapper(QueryStringParameters request)
    {
        var sql = @$"SELECT * FROM Produto
                      WHERE (@Nome IS NULL OR Descricao LIKE '%' + @Nome + '%') 
                      ORDER BY [Descricao] 
                      OFFSET {request.PageSize * (request.PageNumber - 1)} ROWS 
                      FETCH NEXT {request.PageSize} ROWS ONLY 
                      SELECT COUNT(Id) FROM Produto
                      WHERE (@Nome IS NULL OR Descricao LIKE '%' + @Nome + '%')";

        var multi = await Context.Database.GetDbConnection()
            .QueryMultipleAsync(sql, new { Nome = request.Query });

        var produtos = multi.Read<Produto>();
        var total = multi.Read<int>().FirstOrDefault();

        return new PagedResult<Produto>()
        {
            List = produtos,
            TotalCount = total,
            PageSize = request.PageSize,
            CurrentPage = request.PageNumber - 1,
            TotalPages = (int)Math.Ceiling(total / (double)request.PageSize),
            HasPrevious = (request.PageNumber - 1) > 1,
            HasNext = (request.PageNumber - 1) < (int)Math.Ceiling(total / (double)request.PageSize)
        };
    }

    public async Task<PagedList<Produto>> ObterComEF(QueryStringParameters request)
    {
        var lista = Context.Produto
                .Where(x => EF.Functions.Like(x.Descricao, $"%{request.Query}%"))
                .AsNoTrackingWithIdentityResolution();

        return await PagedList<Produto>.ToPagedList(lista, request.PageNumber, request.PageSize);
    }
}