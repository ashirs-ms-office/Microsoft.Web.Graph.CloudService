using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class iOSSwift
    {
        public PlatformModel Build()
        {
            return new PlatformModel
            {
                Id = "option-ios-swift",
                GitHubMDFileName = null,
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_ios_grey_40x41.png"),
                Name = "iOS Swift",
                Alt = "iOS",
                Public = true,
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_IOS_SWIFT,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format("<ul><li>{0}</li><li>{1}</li></ul>",
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_INSTALL + Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_NOTE,
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_ITEM2
                    ),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "iOS")
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForMobilePlatform(),
                SDKCodeSample = CodeSampleFactory.Instance.GetCodeSample("O365-iOS-Swift-sdk-Connect-outlook")
            };
        }
    }
}