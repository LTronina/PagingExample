using System.Linq.Expressions;

namespace PagingExample.Extensions
{
    public static class IQueryableExtensions
    {
        /// <summary>
        /// Sort if property, or nested property found
        /// fail when property name is incorrect
        /// nested example
        /// {
        //  "sorting[Region.Name]": true
        //  }
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="sorting"></param>
        /// <param name="defaultSort"></param>
        /// <returns></returns>
        public static IQueryable<T> OrderByCustom<T>(this IQueryable<T> query,
            IDictionary<string, bool>? sorting,
            KeyValuePair<string, bool> defaultSort) where T : class
        {
            if (sorting?.Any() != true)
            {
                sorting = new Dictionary<string, bool>();
                sorting.Add(defaultSort);
            }

            return OrderBy2<T>(query, sorting);
        }

        private static IQueryable<T> OrderBy2<T>(this IQueryable<T> source, IDictionary<string, bool> sortModels)
        {
            var expression = source.Expression;
            int count = 0;
            foreach (var item in sortModels)
            {
                var parameter = Expression.Parameter(typeof(T), "x");
                MemberExpression selector = CreateExpression(typeof(T), item.Key, parameter);

                var method = item.Value ?
                    (count == 0 ? "OrderByDescending" : "ThenByDescending") :
                    (count == 0 ? "OrderBy" : "ThenBy");
                expression = Expression.Call(typeof(Queryable), method,
                    new Type[] { source.ElementType, selector.Type },
                    expression, Expression.Quote(Expression.Lambda(selector, parameter)));
                count++;
            }
            return count > 0 ? source.Provider.CreateQuery<T>(expression) : source;
        }

        private static MemberExpression CreateExpression(Type type, string propertyName, ParameterExpression p)
        {
            Expression body = p;
            foreach (var member in propertyName.Split('.'))
            {
                body = Expression.PropertyOrField(body, member);
            }

            return (MemberExpression)body;
        }
    }
}