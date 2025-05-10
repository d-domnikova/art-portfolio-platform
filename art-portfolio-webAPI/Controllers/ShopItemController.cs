using BLL.DTO.ShopItem;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/shopItem/")]
    public class ShopItemController : ControllerBase
    {
        private readonly IShopItemService _ShopItemService;

        public ShopItemController(IShopItemService shopItemService)
        {
            _ShopItemService = shopItemService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ShopItemResponse>>> GetAllShopItems()
        {
            var shopItem = await _ShopItemService.GetAsync();
            return Ok(shopItem);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ShopItemResponse>> GetShopItemById(Guid id)
        {
            var shopItem = await _ShopItemService.GetByIdAsync(id);
            if (shopItem == null)
                return NotFound();

            return Ok(shopItem);
        }

        [HttpPost]
        public async Task<IActionResult> AddCommissionSlot([FromBody] CreateShopItem createShopItem)
        {
            await _ShopItemService.CreateAsync(createShopItem);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommissionSlot(Guid id, [FromBody] UpdateShopItem updateShopItem)
        {
            await _ShopItemService.UpdateAsync(id, updateShopItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommissionSlot(Guid id)
        {
            await _ShopItemService.DeleteAsync(id);
            return NoContent();
        }

        //search request

    }
}
