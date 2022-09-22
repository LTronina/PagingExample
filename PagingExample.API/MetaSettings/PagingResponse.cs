namespace PagingExample.MetaSettings
{
    public interface IMetaGetResponse<T>
    {
        MetadataGetResponseFields Metadata { get; }
        IEnumerable<T> Items { get; set; }
    }

    /// <summary>
    /// project wide used for get
    /// </summary>
    public interface IMetadataGetResponseFields : IMetadataPagingResponse, IMetaCsrf
    {
    }

    public class MetadataGetResponseFields : IMetadataGetResponseFields
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }

        public string? CsrfToken { get; set; }

        public MetadataGetResponseFields() : this(0, 0, 0)
        {
        }

        public MetadataGetResponseFields(int totalCount, int pageSize, int currentPage)
        {
            TotalCount = totalCount;
            PageSize = pageSize;
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling((float)totalCount / pageSize);
            HasNext = currentPage < TotalPages;
            HasPrevious = currentPage > 1;
        }
    }

    public interface IMetadataPagingResponse
    {
        int TotalCount { get; set; }
        int PageSize { get; set; }
        int CurrentPage { get; set; }
        int TotalPages { get; set; }
        bool HasNext { get; set; }
        bool HasPrevious { get; set; }
    }
}