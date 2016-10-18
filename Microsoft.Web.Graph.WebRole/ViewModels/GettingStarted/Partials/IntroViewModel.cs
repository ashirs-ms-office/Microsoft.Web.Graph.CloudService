using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    public class IntroPartialViewModel
    {
        public string Title { get; set; } = Resources.GettingStarted.Index.MS_GRAPH_QUICK_START;
        public string Description { get; set; } = Resources.GettingStarted.Index.MS_GRAPH_QUICK_START_DESCRIPTION;
    }
}