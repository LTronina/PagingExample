namespace PagingExample
{
    public record WeatherForecastQuery : IMetaGetQuery
    {
        public Metadata Metadata { get; set; }
    }
}