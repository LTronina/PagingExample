namespace PagingExample
{
    public interface IMetaGetQuery
    {
        Metadata Metadata { get; set; }
    }

    public class Metadata : IMetaQueryFields
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string? CsrfToken { get; set; }
    }

    /// <summary>
    /// project wide used for get
    /// </summary>
    public interface IMetaQueryFields : IMetaPagingQuery, IMetaCsrf
    {
    }

    /// <summary>
    /// For paging
    /// </summary>
    public interface IMetaPagingQuery
    {
        int CurrentPage { get; }
        int PageSize { get; }
    }

    /// <summary>
    /// for other things example
    /// </summary>
    public interface IMetaCsrf
    {
        string CsrfToken { get; }
    }
}