using EONET.Api.Interfaces;
using EONET.Core.Interfaces;
using EONET.Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Api.Services
{
    public class EventsService : IEventsService
    {
        private readonly IEventsProvider _eventsProvider;
        private readonly ILogger<EventsService> _logger;

        public EventsService(IEventsProvider eventsProvider, ILogger<EventsService> logger)
        {
            _eventsProvider = eventsProvider;
            _logger = logger;
        }

        public Task<EventModel> GetEvent(string eventId)
        {
            try
            {
                return _eventsProvider.GetEvent(eventId);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEvent Error: {@exception}", ex);
                throw;
            }
        }

        public Task<IEnumerable<EventModel>> GetEventsList(EventListFilterModel filter)
        {
            try
            {
                return _eventsProvider.GetEventsList(filter);
            }
            catch(Exception ex)
            {
                _logger.LogError("GetEventsList Error: {@exception}", ex);
                throw;
            }
        }
    }
}
