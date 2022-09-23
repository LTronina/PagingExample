using System.Linq.Expressions;

namespace PagingExample.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> OrderByCustom<T>(this IQueryable<T> items, KeyValuePair<string, string> sorting) where T : class
        {
            var type = typeof(T);
            var expression2 = Expression.Parameter(type, "t");
            var property = type.GetProperty(sorting.Key);
            if (property == null)
            {
                return items;
            }

            var expression1 = Expression.MakeMemberAccess(expression2, property);
            var lambda = Expression.Lambda(expression1, expression2);
            var result = Expression.Call(
                typeof(Queryable),
                sorting.Value == "desc" ? "OrderByDescending" : "OrderBy",
                new Type[] { type, property.PropertyType },
                items.Expression,
                Expression.Quote(lambda));

            return items.Provider.CreateQuery<T>(result);
        }
    }
}