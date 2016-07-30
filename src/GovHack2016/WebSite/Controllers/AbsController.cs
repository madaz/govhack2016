using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Linq;
using Newtonsoft.Json;

namespace GovHack2016.WebSite.Controllers
{
    [RoutePrefix("api/abs")]
    public class AbsController : ApiController
    {
        internal static readonly Lazy<List<Dimension>> Dimensions = new Lazy<List<Dimension>>(() =>
        {
            var assembly = typeof(AbsController).Assembly;
            var resourceName = assembly.GetManifestResourceNames().Where(x => x.IndexOf("ABSDimensions.json", StringComparison.OrdinalIgnoreCase) > -1).First();
            var stream = assembly.GetManifestResourceStream(resourceName);
            using (var sr = new StreamReader(stream))
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dimension>>(sr.ReadToEnd());
            }
        });

        [HttpGet][Route("dimensions")]
        public List<Dimension> GetDimensions()
        {
            return Dimensions.Value;
        }

        [HttpGet]
        [Route("dimension/regions")]
        public Dimension GetDimensionRegions()
        {
            return Dimensions.Value.First(x => x.id == "CL_ABS_EIE_REGION");
        }

        [HttpGet]
        [Route("dimension/industries")]
        public Dimension GetDimensionIndustries()
        {
            return Dimensions.Value.First(x => x.id == "CL_ABS_EIE_ANZSIC");
        }

        [HttpGet]
        [Route("dimension/query")]
        public async Task<HttpResponseMessage> GetDimensionQuery([FromUri]string industry, [FromUri] string region)
        {
            if (string.IsNullOrWhiteSpace(industry)) industry = "+";
            if (string.IsNullOrWhiteSpace(region)) region = "+";

            var httpClient = new HttpClient();
            var result = await httpClient.GetStringAsync($"http://govhack.abs.gov.au/restsdmx/sdmx.ashx/GetData/ABS_EIE/+.{industry}.{region}.A/ABS?format=compact_v2");
            var xml = XDocument.Parse(result);
            var json = JsonConvert.SerializeObject(xml);

            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }
        //var url = 

        public class Dimension
        {
            public string id { get; set; }
            public string agencyID { get; set; }
            public string name { get; set; }
            public List<Code> Codes { get; set; }
        }

        public class Code
        {
            public string value { get; set; }
            public string description { get; set; }
            public string parentCode { get; set; }
        }
    }
}