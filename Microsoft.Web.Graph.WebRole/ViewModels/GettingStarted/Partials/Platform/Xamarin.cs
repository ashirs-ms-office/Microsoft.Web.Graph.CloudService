namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Xamarin : IPlatform
    {
        public PlatformModel Build()
        {
            string installVSString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_INSTALL,
                "<a href='https://www.visualstudio.com/vs-2015-product-editions' target='_blank'>Visual Studio 2015 Community ",
                "Enterprise </ a >");
            string verifyWin10String = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_VERIFY,
                "<a href='https://msdn.microsoft.com/library/windows/apps/xaml/dn706236.aspx' target='_blank'>",
                "</a>");
            string makeSureString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_UWP_MAKE_SURE,
                "Windows 10");
            string installXamarinString = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_XAMARIN_INSTALL,
                "<a href='https://www.xamarin.com/visual-studio' target='_blank'>Xamarin for Visual Studio</a>");

            string temp = string.Format("To get set up:<ul><li>{0}</li><li>{1}</li><li>{2}</li><li>{3}</li></ul>",
                        installVSString, installXamarinString, verifyWin10String, makeSureString);
            return new PlatformModel
            {
                Id = "option-xamarin",
                GitHubMDFileName = @"rest-api\/ruby\/getting-started-Office-365-APIs-windowsuniversal.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_xamarin_grey_.png"),
                Name = "Xamarin",
                Alt = "Xamarin",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_DOTNET,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format("To get set up:<ul><li>{0}</li><li>{1}</li><li>{2}</li><li>{3}</li></ul>",
                        installVSString, installXamarinString, verifyWin10String, makeSureString),
                    Notes = "",
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Xamarin")
                }
            };
        }
    }
}