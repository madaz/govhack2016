using System.Web.Mvc;

namespace GovHack2016.WebSite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "GovHack 2016 ProductX";
            return View();
        }
    }
}
