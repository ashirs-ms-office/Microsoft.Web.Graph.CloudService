using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Node : IPlatform
    {
        public PlatformModel Build()
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
    }
}