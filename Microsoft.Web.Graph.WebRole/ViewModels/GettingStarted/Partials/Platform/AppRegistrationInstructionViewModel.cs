using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class AppRegistrationInstructionViewModel
    {
        private static string commonTitle = string.Format("<h1>{0}</h1>", Resources.GettingStarted.Index.REGISTER_APP_TITLE);
        private static string accountString = string.Format(Resources.GettingStarted.Index.REGISTER_APP_GET_ACCOUNT,
            "<a href='http://dev.office.com/devprogram'>", "</a>",
            "<a href='https://signup.live.com/signup?wa=wsignin1.0&ct=1473983465&rver=6.6.6556.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&id=292841&CBCXT=out&cobrandid=90015&bk=1473983466&uiflavor=web&uaid=3b7bae8746264c1bacf1db2b315745cc&mkt=EN-US&lc=1033&lic=1'>Microsoft account</a>");

        public static Instruction GetInstructionForMobilePlatform() //android,iOS,Xamarin,UWP
        {
            string note = string.Format(Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_ENTERPRISE_USER, "<b>", "</b>",
                "<a id='fineprintlink' style='cursor: pointer'>", "</a>", "<a id='v1Link' href='#'>", "</a>");

            return new Instruction()
            {
                Title = commonTitle,
                Description = string.Format("<p>{0}</p><br/></div>{1}", accountString, Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_WILL_WORK),
                Notes = note
            };
        }
        public static Instruction GetInstructionForBackendPlatform()
        {
            //build the instruction
            return new Instruction()
            {
                Title = commonTitle,
                Description = string.Format("<p>{0}</p><br/></div> ", accountString),
                Notes = string.Format(Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_SECRET_KEY_REQUIRED)
            };
        }
        public static Instruction GetInstructionForFrontEndPlatform()
        {
            //build the instruction
            return new Instruction()
            {
                Title = commonTitle,
                Description = string.Format("<p>{0}</p><br/></div> ", accountString),
                Notes = null
            };
        }
    }
}