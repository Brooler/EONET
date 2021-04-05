using EONET.Core.Enums;
using System.Collections.Generic;
using System.Linq;

namespace EONET.Core.Models
{
    public class EventListFilterModel
    {
        public IEnumerable<string> Sources { get; set; }

        public EventStatusEnum? Status { get; set; }

        public int? Limit { get; set; }

        public int? Days { get; set; }

        public Dictionary<string, string> ToDictionary()
        {
            var result = new Dictionary<string, string>();

            if (Sources != null && Sources.Any())
            {
                result.Add("source", string.Join(',', Sources));
            }

            if (Status.HasValue)
            {
                switch (Status.Value)
                {
                    case EventStatusEnum.Open:
                        result.Add("status", "open");
                        break;
                    case EventStatusEnum.Closed:
                        result.Add("status", "closed");
                        break;
                }
            }

            if (Limit.HasValue)
            {
                result.Add("limit", Limit.Value.ToString());
            }

            if (Days.HasValue)
            {
                result.Add("days", Days.Value.ToString());
            }

            return result;
        }
    }
}
