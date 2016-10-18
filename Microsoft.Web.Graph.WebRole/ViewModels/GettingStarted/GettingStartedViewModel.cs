﻿using Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials;
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
            TryItOutPartialViewModel = new TryItOutPartialViewModel();
        }

        public IntroPartialViewModel IntroPartialViewModel { get;set;}
        public TryItOutPartialViewModel TryItOutPartialViewModel { get; set; }
    }
}