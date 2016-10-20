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
        private static List<PlatformModel> PlatformFactory()
        {
            List<PlatformModel> lists = new List<PlatformModel>();
            PlatformModel androidPlatform = new PlatformModel
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
                    Description = Resources.GettingStarted.Index.PLATFORM_SETUP_DESCRIPTION_ANDROID,
                    Notes = Resources.GettingStarted.Index.PICK_PLATFORM_NOTE,
                    Title = string.Format(Resources.GettingStarted.Index.PLATFORM_SETUP_TITLE_ANDROID, "Android2")
                }
            };

            lists.Add(androidPlatform);
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