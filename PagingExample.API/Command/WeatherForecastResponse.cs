using PagingExample.MetaSettings;

namespace PagingExample.Command
{
    public class WeatherForecastResponse : IMetaGetResponse<WeatherForecastResponseDto>
    {
        public MetadataGetResponseFields Metadata { get; set; }
        public IEnumerable<WeatherForecastResponseDto> Items { get; set; }

        public WeatherForecastResponse()
        {
            Items = new List<WeatherForecastResponseDto>();
            Metadata = new MetadataGetResponseFields();
        }
    }

    public class WeatherForecastResponseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}