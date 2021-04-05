using EONET.Api.Interfaces;
using EONET.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace EONET.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventsService _eventsService;
        private readonly ILogger<EventsController> _logger;

        public EventsController(IEventsService eventsService, ILogger<EventsController> logger)
        {
            _eventsService = eventsService;
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetEventList([FromQuery]EventListFilterModel filter)
        {
            try
            {
                return Ok(await _eventsService.GetEventsList(filter));
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEventList Error: {@exception}", ex);
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(string id)
        {
            try
            {
                return Ok(await _eventsService.GetEvent(id));
            }
            catch(Exception ex)
            {
                _logger.LogError("GetEvent Error: {@exception}", ex);
                throw;
            }
        }
    }
}
