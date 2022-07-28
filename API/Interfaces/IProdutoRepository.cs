using Api.Models;
using Api.Pagination;

namespace Api.Interfaces;

public interface IProdutoRepository : IRepository<Produto>
{
    Task<PagedList<Produto>> ObterComEF(QueryStringParameters request);
}