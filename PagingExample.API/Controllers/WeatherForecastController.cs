using Microsoft.AspNetCore.Mvc;
using PagingExample.Command;
using PagingExample.Extensions;
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

        private static List<WeatherForecastResponseDto> data;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            if (data == null)
            {
                data = Enumerable
                .Range(1, 27)
                .Select(index => new WeatherForecastResponseDto(new Region() { Id = index, Name = StringExtensions.RandomString(10) })
                {
                    Id = index,
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                })
             .ToList();
            }
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get([FromQuery] WeatherForecastQuery query)
        {
            var dbResult = data.AsQueryable();

            dbResult = dbResult.OrderByCustom(query.Sorting,
                new KeyValuePair<string, bool>(nameof(WeatherForecastResponseDto.Id), true));

            if (query.Summaries?.Any() == true)
            {
                dbResult = dbResult.Where(x => query.Summaries.Contains(x.Summary));
            }

            if (!dbResult.Any())
            {
                return NotFound();
            }

            var response = new WeatherForecastResponse()
            {
                Items = dbResult.Skip((query.Metadata.CurrentPage - 1) * query.Metadata.PageSize).Take(query.Metadata.PageSize),
                Metadata = new MetadataGetResponseFields(dbResult.Count(), query.Metadata.PageSize, query.Metadata.CurrentPage)
            };

            return Ok(response);
        }
    }
}