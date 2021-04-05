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
    public class NasaEventsProvider : IEventsProvider, ICategoriesProvider
    {
        private readonly IConfiguration _config;
        private readonly ILogger<NasaEventsProvider> _logger;
        private readonly HttpClient _httpClient;

        public NasaEventsProvider(IConfiguration config, ILogger<NasaEventsProvider> logger, HttpClient httpClient)
        {
            _config = config;
            _logger = logger;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<CategoryModel>> GetCategories()
        {
            try
            {
                var response = await _httpClient.GetAsync(_config["NasaProvider:CategoriesEndpoint"]);

                response.EnsureSuccessStatusCode();

                var responseObject = JsonConvert.DeserializeObject<NasaCategoriesResponseModel>(await response.Content.ReadAsStringAsync());

                return responseObject.Categories;
            }
            catch (Exception ex)
            {
                _logger.LogError("GetEventsList Error: {@exception}", ex);
                throw;
            }
        }

        public async Task<EventModel> GetEvent(string eventId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_config["NasaProvider:EventEndpoint"].TrimEnd('/')}/{eventId}");

                response.EnsureSuccessStatusCode();

                return JsonConvert.DeserializeObject<EventModel>(await response.Content.ReadAsStringAsync());
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
                var parameters = filter.ToDictionary();

                var response = await _httpClient.GetAsync($"{_config["NasaProvider:ListEndpoint"]}{CreateParametersString(parameters)}");

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
