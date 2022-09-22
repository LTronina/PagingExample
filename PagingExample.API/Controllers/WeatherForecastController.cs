using Microsoft.AspNetCore.Mvc;
using PagingExample.Command;
using PagingExample.MetaSettings;
using PagingExample.Query;

namespace PagingExample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get([FromQuery] WeatherForecastQuery query)
        {
            var dbResult = Enumerable
                .Range(1, 500)
                .Select(index => new WeatherForecastResponseDto
                {
                    Id = index,
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                })
             .ToArray();

            if (query.Summaries?.Any() == true)
            {
                dbResult = dbResult.Where(x => query.Summaries.Contains(x.Summary)).ToArray();
            }

            if (!dbResult.Any())
            {
                return NotFound();
            }

            var response = new WeatherForecastResponse()
            {
                Items = dbResult.Skip((query.Metadata.CurrentPage - 1) * query.Metadata.PageSize).Take(query.Metadata.PageSize),
                Metadata = new MetadataGetResponseFields(dbResult.Length, query.Metadata.PageSize, query.Metadata.CurrentPage)
            };

            return Ok(response);
        }
    }
}