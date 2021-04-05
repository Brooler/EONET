using EONET.Api.Interfaces;
using EONET.Core.Interfaces;
using EONET.Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<EventModel> GetEvent(string eventId)
        {
            try
            {
                return await _eventsProvider.GetEvent(eventId);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEvent Error: {@exception}", ex);
                throw;
            }
        }

        public async Task<IEnumerable<EventModel>> GetEventsList(EventListFilterModel filter)
        {
            try
            {
                var events = await _eventsProvider.GetEventsList(filter);
                
                if (filter.CategoryId.HasValue)
                {
                    events = events.Where(e => e.Categories.Any(c => c.Id == filter.CategoryId.Value));
                }

                if (filter.Sorting.HasValue)
                {
                    switch (filter.Sorting.Value)
                    {
                        case Core.Enums.SortingTypeEnum.StatusAsc:
                            events = events.OrderBy(e => e.Closed);
                            break;
                        case Core.Enums.SortingTypeEnum.StatusDesc:
                            events = events.OrderByDescending(e => e.Closed);
                            break;
                        case Core.Enums.SortingTypeEnum.DateAsc:
                            events = events.OrderBy(e => e.Geometries?.FirstOrDefault()?.Date);
                            break;
                        case Core.Enums.SortingTypeEnum.DateDesc:
                            events = events.OrderByDescending(e => e.Geometries?.FirstOrDefault()?.Date);
                            break;
                        case Core.Enums.SortingTypeEnum.CategoryAsc:
                            events = events.OrderBy(e => e.Categories?.FirstOrDefault()?.Title);
                            break;
                        case Core.Enums.SortingTypeEnum.CategoryDesc:
                            events = events.OrderByDescending(e => e.Categories?.FirstOrDefault()?.Title);
                            break;
                    }
                }

                return events;
            }
            catch(Exception ex)
            {
                _logger.LogError("GetEventsList Error: {@exception}", ex);
                throw;
            }
        }
    }
}
