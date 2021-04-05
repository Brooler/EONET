using EONET.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Api.Interfaces
{
    public interface IEventsService
    {
        Task<IEnumerable<EventModel>> GetEventsList(EventListFilterModel filter);

        Task<EventModel> GetEvent(string eventId);
    }
}
