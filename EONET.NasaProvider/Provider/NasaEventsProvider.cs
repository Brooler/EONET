using EONET.Core.Enums;
using EONET.Core.Interfaces;
using EONET.Core.Models;
using EONET.NasaProvider.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace EONET.NasaProvider.Provider
{
    public class NasaEventsProvider : IEventsProvider
    {
        private readonly IConfiguration _config;
        private readonly ILogger<NasaEventsProvider> _logger;

        public NasaEventsProvider(IConfiguration config, ILogger<NasaEventsProvider> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task<EventModel> GetEvent(string eventId)
        {
            try
            {
                using var client = CreateHttpClient();

                var response = await client.GetAsync($"{_config["NasaProvider:EventEndpoint"].TrimEnd('/')}/{eventId}");

                response.EnsureSuccessStatusCode();

                return JsonConvert.DeserializeObject<EventModel>(await response.Content.ReadAsStringAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEvent Error: {@exception}", ex);
                throw;
            }
        }

        public async Task<IEnumerable<EventModel>> GetEventsList(string source, EventStatusEnum? status, int? limit, int? days)
        {
            try
            {
                using var client = CreateHttpClient();

                var parameters = new Dictionary<string, string>();

                if (!string.IsNullOrEmpty(source))
                {
                    parameters.Add("source", source);
                }

                if (status.HasValue)
                {
                    switch(status.Value)
                    {
                        case EventStatusEnum.Open:
                            parameters.Add("status", "open");
                            break;
                        case EventStatusEnum.Closed:
                            parameters.Add("status", "closed");
                            break;
                    }
                }

                if (limit.HasValue)
                {
                    parameters.Add("limit", limit.Value.ToString());
                } 
                
                if (days.HasValue)
                {
                    parameters.Add("days", days.Value.ToString());
                }

                var response = await client.GetAsync($"{_config["NasaProvider:ListEndpoint"]}{CreateParametersString(parameters)}");

                response.EnsureSuccessStatusCode();

                var responseObject = JsonConvert.DeserializeObject<NasaEventsResponseModel>(await response.Content.ReadAsStringAsync());

                return responseObject.Events;
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEventsList Error: {@exception}", ex);
                throw;
            }
        }

        private HttpClient CreateHttpClient()
        {
            var client = new HttpClient();

            client.BaseAddress = new Uri(_config["NasaProvider:BaseUrl"]);

            return client;
        }

        private string CreateParametersString(Dictionary<string, string> parameters)
        {
            if (parameters.Count == 0)
            {
                return string.Empty;
            }

            var resultString = "?";

            foreach (var param in parameters)
            {
                resultString += $"{param.Key}={param.Value}&";
            }

            return resultString.TrimEnd('&');
        }
    }
}
