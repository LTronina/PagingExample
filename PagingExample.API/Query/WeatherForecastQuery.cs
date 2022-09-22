using PagingExample.MetaSettings;

namespace PagingExample.Query
{
    public record WeatherForecastQuery
    {
        public WeatherForecastMetadata Metadata { get; set; }
    }

    public class WeatherForecastMetadata : IMetaQueryFields
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string? CsrfToken { get; set; }
    }
}