using Microsoft.Web.Graph.WebRole.ViewModels;
using Microsoft.Web.Portal.Common.Culture;
using Microsoft.Web.Portal.Common.Logging;
using Microsoft.Web.Portal.Common.Telemetry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Microsoft.Web.Graph.WebRole.Controllers
{
    public class GettingStartedController : BaseController
    {
        private ICultureService _cultureService = null;
        private ILogger _logger = null;
        private ITelemetry _telemetry = null;
        public GettingStartedController(ICultureService cultureService, ILogger logger, ITelemetry telemetry)
        {
            _cultureService = cultureService;
            _logger = logger;
            _telemetry = telemetry;
        }

        // GET: GettingStarted
        public ActionResult Index()
        {
            ViewModelBase model = new ViewModelBase(HttpContext.ApplicationInstance.Context);
            model.PageTitle = "Microsoft Graph - Getting Started";
            return View(model);
        }
    }
}
