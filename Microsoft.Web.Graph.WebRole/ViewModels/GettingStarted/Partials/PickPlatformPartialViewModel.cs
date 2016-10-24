using Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform;
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

        private static List<PlatformModel> BuildPlatforms()
        {
            List<PlatformModel> lists = new List<PlatformModel>();
            lists.Add(new Android().Build());
            lists.Add(new Angular().Build());
            lists.Add(new ASPDotNet().Build());
            lists.Add(new iOSSwift().Build());
            lists.Add(new iOSObjectiveC().Build());
            lists.Add(new Node().Build());
            lists.Add(new Php().Build());
            lists.Add(new Ruby().Build());
            lists.Add(new UWP().Build());
            lists.Add(new Xamarin().Build());
            return lists;
        }

        #endregion
        public PickPlatformPartialViewModel()
        {
            Platforms = BuildPlatforms();
        }
        public string Title { get; } = Resources.GettingStarted.Index.PICK_PLATFORM_TITLE;
        public string Description { get;}= Resources.GettingStarted.Index.PICK_PLATFORM_DESCRIPTION;
        public string LetsGo { get; } = Resources.GettingStarted.Index.LETS_GO;

        public List<PlatformModel> Platforms { get; private set; }
    }
}