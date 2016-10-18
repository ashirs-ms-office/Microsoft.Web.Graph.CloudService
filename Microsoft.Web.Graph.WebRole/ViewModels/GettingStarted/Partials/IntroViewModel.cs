using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    public class IntroPartialViewModel
    {
        public string Title { get; set; } = "Microsoft Graph Quick Start";
        public string Description { get; set; } = "This quick start will let you try out calls, register your app, and download a sample app that connects to data using Microsoft Graph. The sample app sends an email on a user's behalf. It will show you how to authenticate and make calls to Microsoft Graph using a school or work or a Microsoft account.";
    }
}