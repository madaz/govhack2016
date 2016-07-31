using System.Web.Mvc;

namespace GovHack2016.WebSite.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            ViewBag.Title = "Question";
            return View();
        }

        public ActionResult List()
        {
            ViewBag.Title = "Question";
            return View();
        }

        public ActionResult Detail()
        {
            ViewBag.Title = "Question";
            return View();
        }

        public ActionResult IndexOld()
        {
            ViewBag.Title = "GovHack 2016 ProductX";
            return View();
        }
    }
}
