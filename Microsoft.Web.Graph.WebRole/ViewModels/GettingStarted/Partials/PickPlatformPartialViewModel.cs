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
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_INSTALL + Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_NOTE,
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_ITEM2
                    ),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "iOS")
                }
            };
        }

        private static PlatformModel CreateiOSObjectiveCPlatformModel()
        {
            return new PlatformModel
            {
                Id = "option-ios-objective-c",
                GitHubMDFileName = null,
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_ios_grey_40x41.png"),
                Name = "iOS Objective-C",
                Alt = "iOS",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_IOS_OBJECTIVE_C,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format("<ul><li>{0}</li><li>{1}</li></ul>",
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_INSTALL,
                        Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_IOS_ITEM2
                    ),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "iOS")
                }
            };
        }
        private static PlatformModel CreateNodePlatformModel()
        {
            return new PlatformModel
            {
                Id = "option-node",
                GitHubMDFileName = @"rest-api\/node\/getting-started-Office-365-APIs-node.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_nodejs_grey_41x41.png"),
                Name = "Node.js",
                Alt = "Node",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_NODE,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_INSTALL_INSTRUCTION_2ITEMS, "Node.js", "npm"),
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Node.js")
                }
            };
        }
        private static PlatformModel CreatePhpPlatformModel()
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
                }
            };
        }

        private static PlatformModel CreateRubyPlatformModel()
        {
            return new PlatformModel
            {
                Id = "option-ruby",
                GitHubMDFileName = @"rest-api\/ruby\/getting-started-Office-365-APIs-ruby.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_ruby_grey_41x41.png"),
                Name = "Ruby",
                Alt = "Ruby",
                PostDownloadInstruction = new Instruction
                {
                    Description = Resources.GettingStarted.Index.POST_DOWNLOAD_INSTRUCTION_NODE,
                    Notes = "",
                    Title = ""
                },
                PreDownloadInstruction = new Instruction
                {
                    Description = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_RUBY, "Ruby on Rails"),
                    Notes = "",
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_COMMON, "Ruby")
                }
            };
        }
        private static PlatformModel CreateUWPPlatformModel()
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
                }
            };
        }

        private static PlatformModel CreateXamarinPlatformModel()
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
        private static List<PlatformModel> PlatformFactory()
        {
            List<PlatformModel> lists = new List<PlatformModel>();
            lists.Add(CreateAndroidPlatformModel());
            lists.Add(CreateAngularPlatformModel());
            lists.Add(CreateASPDotNetPlatformModel());
            lists.Add(CreateiOSSwiftPlatformModel());
            lists.Add(CreateiOSObjectiveCPlatformModel());
            lists.Add(CreateNodePlatformModel());
            lists.Add(CreatePhpPlatformModel());
            lists.Add(CreateRubyPlatformModel());
            lists.Add(CreateUWPPlatformModel());
            lists.Add(CreateXamarinPlatformModel());
            return lists;
        }

        #endregion
        public PickPlatformPartialViewModel()
        {
            Platforms = PlatformFactory();
        }
        public string Title { get; } = Resources.GettingStarted.Index.PICK_PLATFORM_TITLE;
        public string Description { get;}= Resources.GettingStarted.Index.PICK_PLATFORM_DESCRIPTION;
        public string LetsGo { get; } = Resources.GettingStarted.Index.LETS_GO;

        public List<PlatformModel> Platforms { get; private set; }
    }
}