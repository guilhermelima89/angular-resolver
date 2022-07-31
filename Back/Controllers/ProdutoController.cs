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

    [HttpGet("listar")]
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

    [HttpGet("dapper")]
    public async Task<PagedResult<Produto>> GetListDapper([FromQuery] QueryStringParameters request)
    {
        return await _produtoRepository.ObterComDapper(request);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Produto request)
    {
        if (id != request.Id) return BadRequest();

        if (!ModelState.IsValid) return BadRequest(ModelState);

        await _produtoRepository.Update(request);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Remove(int id)
    {
        var item = await _produtoRepository.GetByIdAsync(id);

        if (item is null) return NotFound();

        await _produtoRepository.Remove(id);

        return Ok();
    }
}