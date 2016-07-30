using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web.Http;

namespace GovHack2016.WebSite.Controllers
{
    [RoutePrefix("api/abs")]
    public class AbsController : ApiController
    {
        private static readonly Lazy<object> DimensionData = new Lazy<object>(() =>
        {
            var assembly = typeof(AbsController).Assembly;
            var resourceName = assembly.GetManifestResourceNames().Where(x => x.IndexOf("ABSDimensions.json", StringComparison.OrdinalIgnoreCase) > -1).First();
            var stream = assembly.GetManifestResourceStream(resourceName);
            using (var sr = new StreamReader(stream))
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject(sr.ReadToEnd());
            }
        });

        [HttpGet][Route("dimensions")]
        public object GetDimensions()
        {
            return DimensionData.Value;
        }
    }
}