using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Android : IPlatform
    {
        public PlatformModel Build()
        {
            return new PlatformModel
            {
                Id = "option-android",
                GitHubMDFileName = @"rest-api\/android\/getting-started-Office-365-APIs-android.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_android_grey_34x41.png"),
                Name = Resources.GettingStarted.Index.PLATFORM_NAME_ANDROID,
                Alt = "Android",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_ANDROID,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_INSTALL_INSTRUCTION,
                        "<a href='https://developer.android.com/sdk/index.html' target='_blank'>Android Studio</a>"),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Android")
                }
            };
        }
    }
}