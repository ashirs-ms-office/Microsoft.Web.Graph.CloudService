using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    public class Instruction
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
    }
    public class PlatformModel
    {
        public string Id { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public string Alt { get; set; }
        public Instruction PreDownloadInstruction { get; set; }
        public Instruction PostDownloadInstruction { get; set; }

        public string GitHubMDFileName { get; set; }
    }
    
   
    public class PickPlatformPartialViewModel
    {
        #region MyRegion
        private static PlatformModel CreateAndroidPlatformModel()
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

        private static PlatformModel CreateAngularPlatformModel()
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
                }
            };
        }

        private static PlatformModel CreateASPDotNetPlatformModel()
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
                    "<a href='https://www.visualstudio.com/vs-2015-product-editions' target='_blank'>isual Studio 2015 Community or Enterprise</a>"),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, name)
                }
            };
        }

        private static PlatformModel CreateiOSSwiftPlatformModel()
        {
            return new PlatformModel
            {
                Id = "option-ios-swift",
                GitHubMDFileName = null,
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_ios_grey_40x41.png"),
                Name = "iOS Swift",
                Alt = "iOS",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_IOS_SWIFT,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format("<ul><li>{0}</li><li>{1}</li></ul>",
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_ITEM1,
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_ITEM2
                    ),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "iOS")
                }
            };
        }
        private static List<PlatformModel> PlatformFactory()
        {
            List<PlatformModel> lists = new List<PlatformModel>();
            lists.Add(CreateAndroidPlatformModel());
            lists.Add(CreateAngularPlatformModel());
            lists.Add(CreateASPDotNetPlatformModel());
            lists.Add(CreateiOSSwiftPlatformModel());
            return lists;
        }

        #endregion
        public PickPlatformPartialViewModel()
        {
            Platforms = PlatformFactory();
        }
        public string Title { get; } = Resources.GettingStarted.Index.PICK_PLATFORM_TITLE;
        public string Description { get;}= Resources.GettingStarted.Index.PICK_PLATFORM_DESCRIPTION;

        public List<PlatformModel> Platforms { get; private set; }
    }
}