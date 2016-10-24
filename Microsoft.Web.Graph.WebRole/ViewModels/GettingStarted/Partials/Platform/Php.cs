using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Php : IPlatform
    {
        public PlatformModel Build()
        {
            return new PlatformModel
            {
                Id = "option-php",
                GitHubMDFileName = @"rest-api\/php\/getting-started-Office-365-APIs-php.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_php_grey_41x41.png"),
                Name = "PHP",
                Alt = "PHP",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_NODE,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_INSTALL_INSTRUCTION, "PHP version >5.6.0"),
                    Notes = "",
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "PHP")
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForBackendPlatform(),
                CodeSample = new CodeSample[] { CodeSampleFactory.Instance.GetCodeSample("option-php-outlook") }

            };
        }
    }
}