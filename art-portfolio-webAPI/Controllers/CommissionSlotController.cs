using BLL.DTO.CommisionSlot;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/commission/")]
    public class CommissionSlotController : ControllerBase
    {
        private readonly ICommissionSlotService _commissionSlotService;

        public CommissionSlotController(ICommissionSlotService commissionSlotService)
        {
            _commissionSlotService = commissionSlotService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CommissionSlotResponse>>> GetAllCommissionSlots()
        {
            var commission = await _commissionSlotService.GetAsync();
            return Ok(commission);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<CommissionSlotResponse>> GetCommissionSlotById(Guid id)
        {
            var commission = await _commissionSlotService.GetByIdAsync(id);
            if (commission == null)
                return NotFound();

            return Ok(commission);
        }

        [HttpPost]
        public async Task<IActionResult> AddCommissionSlot([FromBody] CreateCommissionSlot createCommissionSlot)
        {
            await _commissionSlotService.CreateAsync(createCommissionSlot);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommissionSlot(Guid id, [FromBody] UpdateCommissionSlot updateCommissionSlot)
        {
            await _commissionSlotService.UpdateAsync(id, updateCommissionSlot);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommissionSlot(Guid id)
        {
            await _commissionSlotService.DeleteAsync(id);
            return NoContent();
        }

        //search request
    }
}
