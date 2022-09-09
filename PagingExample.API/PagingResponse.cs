﻿namespace PagingExample
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

        public string CsrfToken { get; set; }

        public MetadataGetResponseFields(int totalCount, int pageSize, int currentPage)
        {
            this.TotalCount = totalCount;
            this.PageSize = pageSize;
            this.CurrentPage = currentPage;
            this.TotalPages = (int)Math.Ceiling((float)totalCount / pageSize);
            this.HasNext = currentPage < this.TotalPages;
            this.HasPrevious = currentPage > 1;
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