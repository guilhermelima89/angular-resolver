using Api.Interfaces;
using Api.Models;
using Api.Data;
using Data.Repositories;
using Api.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories;

public class ProdutoRepository : Repository<Produto>, IProdutoRepository
{
    public ProdutoRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<PagedList<Produto>> ObterComEF(QueryStringParameters request)
    {
        var lista = Context.Produto
                .Where(x => EF.Functions.Like(x.Descricao, $"%{request.Query}%"))
                .AsNoTrackingWithIdentityResolution();

        return await PagedList<Produto>.ToPagedList(lista, request.PageNumber, request.PageSize);
    }
}