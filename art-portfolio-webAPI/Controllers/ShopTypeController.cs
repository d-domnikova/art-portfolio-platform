using BLL.DTO.ShopType;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/shopType/")]
    public class ShopTypeController : ControllerBase
    {
        private readonly IShopTypeService _shopTypeService;

        public ShopTypeController(IShopTypeService shopTypeService)
        {
            _shopTypeService = shopTypeService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ShopTypeResponse>>> GetAllShopTypes()
        {
            var shopType = await _shopTypeService.GetAsync();
            return Ok(shopType);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ShopTypeResponse>> GetShopTypeById(Guid id)
        {
            var shopType = await _shopTypeService.GetByIdAsync(id);
            if (shopType == null)
                return NotFound();

            return Ok(shopType);
        }

        [HttpPost]
        public async Task<IActionResult> AddShopType([FromBody] CreateShopType createShopType)
        {
            await _shopTypeService.CreateAsync(createShopType);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShopType(Guid id, [FromBody] UpdateShopType updateShopType)
        {
            await _shopTypeService.UpdateAsync(id, updateShopType);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopType(Guid id)
        {
            await _shopTypeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
