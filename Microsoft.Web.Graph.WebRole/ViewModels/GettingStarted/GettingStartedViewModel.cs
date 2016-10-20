using Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted
{
    public class GettingStartedViewModel : ViewModelBase
    {
        public GettingStartedViewModel(HttpContext context) : base(context)
        {
            IntroPartialViewModel = new IntroPartialViewModel();
            TryOutPartialViewModel = new TryOutPartialViewModel();
            PickPlatformPartialViewModel = new PickPlatformPartialViewModel();
        }

        public IntroPartialViewModel IntroPartialViewModel { get;set;}
        public TryOutPartialViewModel TryOutPartialViewModel { get; set; }
        public PickPlatformPartialViewModel PickPlatformPartialViewModel { get; set; }
    }
}