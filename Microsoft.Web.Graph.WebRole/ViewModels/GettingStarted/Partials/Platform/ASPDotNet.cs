using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class ASPDotNet : IPlatform
    {
        public PlatformModel Build()
        {
            string name = "ASP.NET MVC";
            return new PlatformModel
            {
                Id = "option-dotnet",
                GitHubMDFileName = @"rest-api\/dotnet\/getting-started-Office-365-APIs-dotnet.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_asp_grey_40x41.png"),
                Name = name,
                Alt = ".NET",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_DOTNET,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_INSTALL_INSTRUCTION,
                    "<a href='https://www.visualstudio.com/vs-2015-product-editions' target='_blank'>Visual Studio 2015 Community or Enterprise</a>"),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, name)
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForBackendPlatform(),
                CodeSample = new CodeSample[] { CodeSampleFactory.Instance.GetCodeSample("option-dotnet-mail-api") }

            };
        }
    }
}