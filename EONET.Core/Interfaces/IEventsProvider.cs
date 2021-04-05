using EONET.Core.Enums;
using EONET.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EONET.Core.Interfaces
{
    public interface IEventsProvider
    {
        Task<IEnumerable<EventModel>> GetEventsList(string source, EventStatusEnum? status, int? limit, int? days);

        Task<EventModel> GetEvent(string eventId);
    }
}
