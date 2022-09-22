namespace PagingExample.MetaSettings
{
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