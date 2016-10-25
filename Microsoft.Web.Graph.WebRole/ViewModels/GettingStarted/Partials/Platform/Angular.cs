using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Angular : IPlatform
    {
        public PlatformModel Build()
        {
            return new PlatformModel
            {
                Id = "option-angular",
                GitHubMDFileName = @"rest-api\/ruby\/getting-started-Office-365-APIs-angular.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_angular_grey_40x41.png"),
                Name = "Angular",
                Alt = "Angular",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_ANGULAR,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_INSTALL_INSTRUCTION,
                    "<a href='https://nodejs.org/' target='_blank'>Node.js</a> and <a href='https://bower.io/' target='_blank'>Bower</a>"),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Angular")
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForFrontEndPlatform(),
                CodeSample = new CodeSample[] { CodeSampleFactory.Instance.GetCodeSample("option-angular-outlook") }
            };
        }
    }
}