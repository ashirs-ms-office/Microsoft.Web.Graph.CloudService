namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class UWP : IPlatform
    {
        public PlatformModel Build()
        {
            string installString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_INSTALL,
                "<a href='https://www.visualstudio.com/vs-2015-product-editions' target='_blank'>Visual Studio 2015 Community ",
                "Enterprise </ a >");
            string verifyString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_VERIFY,
                "<a href='https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx' target='_blank'>",
                "</a>");
            string makeSureString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_MAKE_SURE,
                "Windows 10");

            return new PlatformModel
            {
                Id = "option-windowsuniversal",
                GitHubMDFileName = @"rest-api\/ruby\/getting-started-Office-365-APIs-windowsuniversal.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_windows_grey_40x41.png"),
                Name = "Universal Windows Platform",
                Alt = "Universal Windows Platform",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_DOTNET,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format("To get set up:<ul><li>{0}</li><li>{1}</li><li>{2}</li></ul>", installString, verifyString, makeSureString),
                    Notes = "",
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Universal Windows Platform (UWP)")
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForMobilePlatform(),
                CodeSample = new CodeSample[] {
                    CodeSampleFactory.Instance.GetCodeSample("option-windowsuniversal-sdk-outlook"),
                    CodeSampleFactory.Instance.GetCodeSample("option-windowsuniversal-outlook")
                }

            };
        }
    }
}