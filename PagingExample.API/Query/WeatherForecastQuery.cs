using PagingExample.MetaSettings;

namespace PagingExample.Query
{
    public class WeatherForecastQuery
    {
        public WeatherForecastMetadata Metadata { get; set; }
        public string[] Summaries { get; set; }

        public WeatherForecastQuery()
        {
            Summaries = Array.Empty<string>();
            Metadata = new WeatherForecastMetadata();
        }
    }

    public class WeatherForecastMetadata : IMetaQueryFields
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string? CsrfToken { get; set; }
    }
}