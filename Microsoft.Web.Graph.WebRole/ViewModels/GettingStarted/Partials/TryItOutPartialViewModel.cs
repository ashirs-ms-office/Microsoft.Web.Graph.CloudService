using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    public class TryItOutPartialViewModel
    {
        public string Title { get; set; } = Resources.GettingStarted.Index.TRY_OUT_TITLE;
        public string Description { get; set; } = Resources.GettingStarted.Index.TRY_OUT_DESCRIPTION;
    }
}