using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials.Platform
{
    public class AppRegistrationInstructionViewModel
    {
        public static Instruction GetInstructionForMobilePlatform() //android,iOS,Xamarin,UWP
        {
            string accountString = string.Format(Resources.GettingStarted.Index.REGISTER_APP_GET_ACCOUNT,
                "<a href='http://dev.office.com/devprogram'>", "</a>",
                "<a href='https://signup.live.com/signup?wa=wsignin1.0&ct=1473983465&rver=6.6.6556.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&id=292841&CBCXT=out&cobrandid=90015&bk=1473983466&uiflavor=web&uaid=3b7bae8746264c1bacf1db2b315745cc&mkt=EN-US&lc=1033&lic=1'>Microsoft account</a>");

            //add html formatting
            accountString = string.Format("<p>{0}</p><br/></div> ", accountString);

            //string headsUp = string.Format(Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_SECRET_KEY_REQUIRED);

            ////add html formatting
            //headsUp = "<div class='yellowNote'>" + headsUp + "</div>";
            //headsUp += "<div>This sample app will work for most users*.</div>";


            string note = string.Format(Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_ENTERPRISE_USER, "<b>", "</b>",
                "<a id='fineprintlink' style='cursor: pointer'>", "</a>", "<a id='v1Link' href='#'>", "</a>");

            //add html formatting
            //note = string.Format("< div id = 'mobileMessage' hidden class='yellowNote'>{0}</div>", note);
            //build the instruction
            return new Instruction()
            {
                Title = Resources.GettingStarted.Index.REGISTER_APP_TITLE,
                Description = accountString + Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_WILL_WORK,
                Notes = note
            };
            /* 
             Register the sample app
            To register your app, we will take you to the Microsoft Application Registration portal where you will be able to get an App ID and redirect URL. You will need either a school or work or Microsoft account. 

            This sample app will work for most users*.
             
            *Building an app for enterprise users only? Use Azure Active Directory V1. Here is why. Get Started with this code sample.
             */
        }
        public static Instruction GetInstructionForBackendPlatform()
        {
            string accountString = string.Format(Resources.GettingStarted.Index.REGISTER_APP_GET_ACCOUNT,
                "<a href='http://dev.office.com/devprogram'>", "</a>",
                "<a href='https://signup.live.com/signup?wa=wsignin1.0&ct=1473983465&rver=6.6.6556.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&id=292841&CBCXT=out&cobrandid=90015&bk=1473983466&uiflavor=web&uaid=3b7bae8746264c1bacf1db2b315745cc&mkt=EN-US&lc=1033&lic=1'>Microsoft account</a>");

            //add html formatting
            accountString = string.Format("<p>{0}</p><br/></div> ", accountString);

            //build the instruction
            return new Instruction()
            {
                Title = Resources.GettingStarted.Index.REGISTER_APP_TITLE,
                Description = accountString,
                Notes = string.Format(Resources.GettingStarted.Index.REGISTER_APP_SAMPLE_SECRET_KEY_REQUIRED)
            };
        }
        public static Instruction GetInstructionForFrontEndPlatform()
        {
            string accountString = string.Format(Resources.GettingStarted.Index.REGISTER_APP_GET_ACCOUNT,
                "<a href='http://dev.office.com/devprogram'>", "</a>",
                "<a href='https://signup.live.com/signup?wa=wsignin1.0&ct=1473983465&rver=6.6.6556.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f&id=292841&CBCXT=out&cobrandid=90015&bk=1473983466&uiflavor=web&uaid=3b7bae8746264c1bacf1db2b315745cc&mkt=EN-US&lc=1033&lic=1'>Microsoft account</a>");

            //add html formatting
            accountString = string.Format("<p>{0}</p><br/></div> ", accountString);

            //build the instruction
            return new Instruction()
            {
                Title = Resources.GettingStarted.Index.REGISTER_APP_TITLE,
                Description = accountString,
                Notes = null
            };
        }
    }
}