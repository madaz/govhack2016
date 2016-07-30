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

        internal static readonly Lazy<Dictionary<string, string>> IndustriesForAllRegions = new Lazy<Dictionary<string, string>>(() =>
        {
            var assembly = typeof(AbsController).Assembly;
            var resourceName = assembly.GetManifestResourceNames().Where(x => x.IndexOf("ABS_EIE_B_mining.json", StringComparison.OrdinalIgnoreCase) > -1).First();
            var stream = assembly.GetManifestResourceStream(resourceName);

            var dic = new Dictionary<string, string>();
            using (var sr = new StreamReader(stream))
            {
                dic["B"] = sr.ReadToEnd();
            }

            return dic;
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
        [Route("dimension/industry/{code}")]
        public async Task<HttpResponseMessage> GetIndustry(string code)
        {
            if (IndustriesForAllRegions.Value.ContainsKey(code))
            {
                return CreateRawJson(IndustriesForAllRegions.Value[code]);
            }
            
            var response = await GetDimensionQuery(code, "");
            return response;
        }

        [HttpGet]
        [Route("dimension/query")]
        public async Task<HttpResponseMessage> GetDimensionQuery([FromUri]string industry, [FromUri] string region)
        {
            if (string.IsNullOrWhiteSpace(industry)) industry = "+";
            if (string.IsNullOrWhiteSpace(region)) region = "+";

            // check cached data
            if (region == "+" && IndustriesForAllRegions.Value.ContainsKey(industry))
            {
                return CreateRawJson(IndustriesForAllRegions.Value[industry]);
            }

            var httpClient = new HttpClient();
            var result = await httpClient.GetStringAsync($"http://govhack.abs.gov.au/restsdmx/sdmx.ashx/GetData/ABS_EIE/+.{industry}.{region}.A/ABS?format=compact_v2");
            var xml = XDocument.Parse(result);
            var json = JsonConvert.SerializeObject(xml);

            return CreateRawJson(json);
        }
        

        private HttpResponseMessage CreateRawJson(string json)
        {
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");
            return response;
        }

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


        public class EIEResults
        {
            [JsonProperty(propertyName: "message:CompactData")]
            public CompactData CompactData { get; set; }
        }

        public class CompactData
        {
            [JsonProperty("ABS:DataSet")]
            public DataSet DataSet { get; set; }
        }

        public class DataSet
        {
            [JsonProperty("ABS:Series")]
            public Series[] Series { get; set; }
        }

        public class Series
        {
            [JsonProperty("@MEASURE")]
            public string Measure { get; set; }
            [JsonProperty("@ANZSIC")]
            public string AnzSic { get; set; }
            [JsonProperty("@REGION")]
            public string Region { get; set; }
            [JsonProperty("@FREQUENCY")]
            public string Frequency { get; set; }
            [JsonProperty("@TIME_FORMAT")]
            public string TimeFormat { get; set; }

            [JsonProperty("ABS:Obs")]
            public Cds[] Cds { get; set; }
        }

        public class Cds
        {
            [JsonProperty("@TIME")]
            public string Time { get; set; }
            [JsonProperty("@OBS_VALUE")]
            public string Value { get; set; }
            [JsonProperty("@OBS_STATUS")]
            public string Status { get; set; }
        }
    }
}