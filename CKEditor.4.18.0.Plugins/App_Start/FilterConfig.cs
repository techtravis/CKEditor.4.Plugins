using System.Web;
using System.Web.Mvc;

namespace CKEditor._4._18._0.Plugins
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
