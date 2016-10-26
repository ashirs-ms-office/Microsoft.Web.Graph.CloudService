namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class Ruby : IPlatform
    {
        public PlatformModel Build()
        {
            return new PlatformModel
            {
                Id = "option-ruby",
                GitHubMDFileName = @"rest-api\/ruby\/getting-started-Office-365-APIs-ruby.md",
                Icon = Portal.Common.RunTimeEnvironment.GetMediaUrl("/media/Default/GettingStarted/devOffice_getting_started_ruby_grey_41x41.png"),
                Name = "Ruby",
                Alt = "Ruby",
                Public = false,
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
                },
                AppRegistrationInstruction = AppRegistrationInstructionViewModel.GetInstructionForBackendPlatform(),
                RestCodeSample = CodeSampleFactory.Instance.GetCodeSample("option-ruby-outlook")
            };
        }
    }
}