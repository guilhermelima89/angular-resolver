using Api.Interfaces;
using Api.Models;
using Api.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProdutoController : ControllerBase
{
    private readonly IProdutoRepository _produtoRepository;
    public ProdutoController(IProdutoRepository produtoRepository)
    {
        _produtoRepository = produtoRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Produto>> GetAll([FromQuery] QueryStringParameters request)
    {
        var response = await _produtoRepository.ObterComEF(request);

        var metadata = new PaginationViewModel
        {
            TotalCount = response.TotalCount,
            PageSize = response.PageSize,
            CurrentPage = response.CurrentPage - 1,
            TotalPages = response.TotalPages,
            HasNext = response.HasNext,
            HasPrevious = response.HasPrevious
        };

        Response.Headers.Add("X-Pagination", metadata.ToJson());

        return response;
    }

    [HttpGet("lista")]
    public async Task<PagedResult<Produto>> GetList([FromQuery] QueryStringParameters request)
    {
        var response = await _produtoRepository.ObterComEF(request);

        var metadata = new PagedResult<Produto>()
        {
            List = response,
            TotalCount = response.TotalCount,
            PageSize = response.PageSize,
            CurrentPage = response.CurrentPage - 1,
            TotalPages = response.TotalPages,
            HasNext = response.HasNext,
            HasPrevious = response.HasPrevious
        };

        return metadata;
    }
}