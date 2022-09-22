using PagingExample.MetaSettings;

namespace PagingExample.Command
{
    public record WeatherForecastResponse : IMetaGetResponse<WeatherForecastResponseDto>
    {
        public MetadataGetResponseFields Metadata { get; set; }
        public IEnumerable<WeatherForecastResponseDto> Items { get; set; }
    }

    public record WeatherForecastResponseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}