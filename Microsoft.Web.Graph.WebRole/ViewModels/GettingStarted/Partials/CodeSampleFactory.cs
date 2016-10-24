using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microsoft.Web.Graph.WebRole.ViewModels.GettingStarted.Partials
{
    public class Repo
    {
        public string Platform { get; set; }
        public string uid { get; set; }
        public string App { get; set; }
        public string CodeSampleName { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public string ClientIdStringToReplace { get; set; }
        public string ClientSecretStringToReplace { get; set; }
        public string RedirectURLStringToReplace { get; set; }
        public string SignOnURLStringToReplace { get; set; }
        public string LocalZipFile { get; set; }
        public string GitHubRepoName { get; set; }
        public string GitHubMasterZipUrl { get; set; }
        public string GitHubRepoUrl { get; set; }
    }

    public class CodeSample
    {
        public string Id { get; set; }
        public string RedirectUri { get; set; }
        public bool Public { get; set; }
        public string Name { get; set; }
        public string V1Link { get; set; }
        public bool AllowImplicitFlow { get; set; }

        public Repo Repo { get; set; }
    }

    public class CodeSampleFactory
    {

        private static CodeSampleFactory _instance = null;

        private void CreateRepos()
        {
            #region Repo Information

            string jsonData = @"[{
            'Platform': 'option-ios',
            'uid': 'O365-iOS-Connect-outlook',
            'App': 'outlook',
            'CodeSampleName': 'O365-iOS-Connect',
            'Description': 'This Connect sample for iOS shows how to connect your app to Office 365. Once connected, the sample shows how to send a simple service call. Comes in both Swift and Objective-C',
            'FileName': 'O365-iOS-Microsoft-Graph-Connect-master\/O365-iOS-Unified-API-Connect\/ConnectViewController.m',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_CLIENTSECRET_ID_HERE_HackWillNotReplace', //TODO: check if this matters!
            'RedirectURLStringToReplace': 'ENTER_YOUR_REDIRECT_URI',
            'SignOnURLStringToReplace': 'ENTER_SIGNON_URI_HERE_HackWillNotReplace', //TODO: check if this matters!
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples/O365-iOS-Microsoft-Graph-Connect-master.zip',
            'GitHubRepoName': 'O365-iOS-Microsoft-Graph-Connect',
            'GitHubMasterZipUrl': 'https://github.com/OfficeDev/O365-iOS-Microsoft-Graph-Connect/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/OfficeDev/O365-iOS-Microsoft-Graph-Connect'
        },
        {
            'Platform': 'option-android',
            'uid': 'O365-Android-Connect-outlook',
            'App': 'outlook',
            'CodeSampleName': 'O365-Android-Connect',
            'Description': 'This Connect sample for Android shows you how to connect your app to Office 365. It also demonstrates how to issue a simple service call, like sending an email.',
            'FileName': 'O365-Android-Microsoft-Graph-Connect-master\/app\/src\/main\/java\/com\/microsoft\/office365\/connectmicrosoftgraph\/Constants.java',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_CLIENTSECRET_ID_HERE_HackWillNotReplace', //TODO: check if this matters!
            'RedirectURLStringToReplace': 'ENTER_YOUR_REDIRECT_URI',
            'SignOnURLStringToReplace': 'ENTER_SIGNON_URI_HERE_HackWillNotReplace', //TODO: check if this matters!
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-Android-Microsoft-Graph-Connect-master.zip',
            'GitHubRepoName': 'O365-Android-Microsoft-Graph-Connect',
            'GitHubMasterZipUrl': 'https://github.com/OfficeDev/O365-Android-Microsoft-Graph-Connect/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/OfficeDev/O365-Android-Microsoft-Graph-Connect'
        },
        {
            'Platform': 'option-dotnet',
            'uid': 'option-dotnet-mail-api',
            'App': 'outlook',
            'CodeSampleName': 'DotNet-tutorial', /* we need to add name */
            'Description': 'An ASP.NET MVC tutorial for using the Mail API. ',
            'FileName': 'O365-AspNetMVC-Microsoft-Graph-Connect-master\/UnifiedApiConnect\/Web.config',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-AspNetMVC-Microsoft-Graph-Connect-master.zip',
            'GitHubRepoName': 'O365-AspNetMVC-Microsoft-Graph-Connect',
            'GitHubMasterZipUrl': 'https://github.com/OfficeDev/O365-AspNetMVC-Microsoft-Graph-Connect/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/OfficeDev/O365-AspNetMVC-Microsoft-Graph-Connect'
        },
        {
            'Platform': 'option-php',
            'uid': 'option-php-outlook',
            'App': 'outlook',
            'CodeSampleName': 'Simple PHP tutorial',
            'Description': 'A simple tutorial for creating a PHP app that uses the Outlook Mail API',
            'FileName': 'php-connect-rest-sample-master\/src\/Constants.php',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',            
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/php-connect-rest-sample-master.zip',
            'GitHubRepoName': 'php-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/php-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/php-connect-rest-sample.git'
        },
        {
            'Platform': 'option-node',
            'uid': 'option-node-outlook',
            'CodeSampleName': 'Simple Node.js tutorial',
            'Description': 'A simple Node.js tutorial to use the Mail API.',
            'App': 'outlook',
            'FileName': 'nodejs-connect-rest-sample-master\/authHelper.js',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/nodejs-connect-rest-sample-master.zip',
            'GitHubRepoName': 'nodejs-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/nodejs-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/nodejs-connect-rest-sample.git'
        },
        {
            'Platform': 'option-python',
            'uid': 'option-python-outlook',
            'CodeSampleName': 'Simple Python tutorial',
            'Description': 'A simple tutorial for creating a Python app that uses the Outlook Mail API.',
            'App': 'outlook',
            'FileName': 'O365-Python-Microsoft-Graph-Connect-master\/connect\/config.py',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/O365-Python-Microsoft-Graph-Connect-master.zip',
            'GitHubRepoName': 'O365-Python-Microsoft-Graph-Connect',
            'GitHubMasterZipUrl': 'https://github.com/OfficeDev/O365-Python-Microsoft-Graph-Connect/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/OfficeDev/O365-Python-Microsoft-Graph-Connect'
        },
        {
            'Platform': 'option-ruby',
            'uid': 'option-ruby-outlook',
            'CodeSampleName': 'O365-tutorial',
            'Description': 'A simple guide to writing your first Ruby on Rails app using the Outlook Mail API.', /* we need to add description */
            'App': 'outlook',
            'FileName': 'ruby-connect-rest-sample-master\/config\/environment.rb',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',
            'TenantNameToReplace': 'ENTER_YOUR_TENANT',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/ruby-connect-rest-sample-master.zip',
            'GitHubRepoName': 'ruby-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/ruby-connect-rest-sample.git',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/ruby-connect-rest-sample.git'
        },
        {
            'Platform': 'option-angular',
            'uid': 'option-angular-outlook',            
            'App': 'outlook',
            'FileName': 'angular-connect-rest-sample-master\/public\/scripts\/config.js',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/angular-connect-rest-sample-master.zip',
            'GitHubRepoName': 'angular-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/angular-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/angular-connect-rest-sample.git'
        },
        {
            'Platform': 'option-windowsuniversal',
            'uid': 'option-windowsuniversal-outlook',            
            'App': 'outlook',
            'FileName': 'uwp-csharp-connect-rest-sample-master\/O365-UWP-Unified-API-Connect\/App.xaml',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'TenantNameToReplace': 'ENTER_YOUR_TENANT',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/uwp-csharp-connect-rest-sample-master.zip',
            'GitHubRepoName': 'uwp-csharp-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample.git'
        },
        {
            'Platform': 'option-windowsuniversal-sdk',
            'uid': 'option-windowsuniversal-sdk-outlook',
            'App': 'outlook',
            'FileName': 'uwp-csharp-connect-sample-master\/Microsoft-Graph-UWP-Connect-SDK\/App.xaml',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'TenantNameToReplace': 'ENTER_YOUR_TENANT',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/uwp-csharp-connect-sample-master.zip',
            'GitHubRepoName': 'uwp-csharp-connect-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/uwp-csharp-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/uwp-csharp-connect-sample.git'
        },
        {
            'Platform': 'option-dotnet-sdk',
            'uid': 'option-dotnet-sdk-mail-api',
            'App': 'outlook',
            'FileName': 'aspnet-connect-sample-master\/Microsoft Graph SDK ASPNET Connect\/Microsoft Graph SDK ASPNET Connect\/Web.config',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'TenantNameToReplace': 'ENTER_YOUR_TENANT',
            'ClientSecretStringToReplace': 'ENTER_YOUR_SECRET',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/aspnet-connect-sample-master.zip',
            'GitHubRepoName': 'aspnet-connect-sample-master',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/aspnet-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/aspnet-connect-sample.git'
        },
        {
            'Platform': 'option-android-sdk',
            'uid': 'option-android-sdk-outlook',
            'App': 'outlook',
            'FileName': 'android-java-connect-sample-master\/app\/src\/main\/java\/com\/microsoft\/graph\/connect\/Constants.java', //TODO
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'RedirectURLStringToReplace': 'ENTER_YOUR_REDIRECT_URI',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/android-java-connect-sample-master.zip',
            'GitHubRepoName': 'android-java-connect-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/android-java-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/android-java-connect-sample.git'
        },
        {
            'Platform': 'option-ios-swift-sdk',
            'uid': 'O365-iOS-Swift-sdk-Connect-outlook',
            'App': 'outlook',
            'FileName': 'ios-swift-connect-sample-master\/Graph-iOS-Swift-Connect\/ApplicationConstants.swift',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-swift-connect-sample-master.zip',
            'GitHubRepoName': 'ios-swift-connect-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/ios-swift-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/ios-swift-connect-sample.git'
        },
        {
            'Platform': 'option-ios-swift',
            'uid': 'O365-iOS-Swift-Connect-outlook',
            'App': 'outlook',
            'FileName': 'ios-swift-connect-rest-sample-master\/O365-iOS-Microsoft-Graph-Connect-Swift\/AuthenticationConstants.swift',
            'ClientIdStringToReplace': 'ENTER_CLIENT_ID_HERE', //TODO: change?
            'RedirectURLStringToReplace': 'ENTER_REDIRECT_URI_HERE', //TODO: change?
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-swift-connect-rest-sample-master.zip',
            'GitHubRepoName': 'ios-swift-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/ios-swift-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/ios-swift-connect-rest-sample.git'
        },
        {
            'Platform': 'option-ios-objective-c-sdk',
            'uid': 'O365-iOS-Objective-C-sdk-Connect-outlook',
            'App': 'outlook',
            'FileName': 'ios-objectivec-connect-sample-master\/O365-iOS-Microsoft-Graph-SDK\/AuthenticationConstants.m',
            'ClientIdStringToReplace': 'ENTER_CLIENT_ID_HERE', //TODO: change?
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-objectivec-connect-sample-master.zip',
            'GitHubRepoName': 'ios-objectivec-connect-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/ios-objectivec-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/ios-objectivec-connect-sample.git'
        },
        {
            'Platform': 'option-ios-objective-c',
            'uid': 'O365-iOS-Objective-C-Connect-outlook',
            'App': 'outlook',
            'FileName': 'ios-objectivec-connect-rest-sample-master\/O365-iOS-Microsoft-Graph-Connect\/ConnectViewController.m',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'RedirectURLStringToReplace': 'ENTER_YOUR_REDIRECT_URI',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/ios-objectivec-connect-rest-sample-master.zip',
            'GitHubRepoName': 'ios-objectivec-connect-rest-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample.git'
        },
        {
            'Platform': 'option-xamarin-sdk',
            'uid': 'Xamarin-Connect-outlook',
            'App': 'outlook',
            'FileName': 'xamarin-csharp-connect-sample-master\/XamarinConnect\/XamarinConnect\/App.cs',
            'ClientIdStringToReplace': 'ENTER_YOUR_CLIENT_ID',
            'LocalZipFile': '\/Modules\/Graph.GettingStarted\/CodeSamples\/xamarin-csharp-connect-sample-master.zip',
            'GitHubRepoName': 'xamarin-csharp-connect-sample',
            'GitHubMasterZipUrl': 'https://github.com/microsoftgraph/xamarin-csharp-connect-sample/archive/master.zip',
            'GitHubRepoUrl': 'https://github.com/microsoftgraph/xamarin-csharp-connect-sample.git'
        }
        ]";
        #endregion
            Repos = JsonConvert.DeserializeObject<Repo[]>(jsonData);
        }

        private Repo GetRepo(string repoId)
        {
            Repo result = null;
            foreach (var repo in Repos)
            {
                if(repo.uid == repoId) {
                    result = repo;
                    break;
                }
            }
            if (result == null)
            {
                throw new ArgumentException(string.Format("Platform {0} not found in repo factory", repoId));
            }

            return result;
        }
        private Repo[] Repos { get; set; }
        public CodeSample[] CodeSamples { get; private set; }

        private CodeSampleFactory()
        {
            CreateRepos();
            CreateCodeSamples();
        }
        public static CodeSampleFactory Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new CodeSampleFactory();
                return _instance;
            }
        }

        private void CreateCodeSamples()
        {
            CodeSamples = new CodeSample[]
            {
                new CodeSample { /* Android */
                   Name="My Android App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/tree/last_v1_auth",
                   Repo = GetRepo("O365-Android-Connect-outlook"),
                   AllowImplicitFlow = false,
                   Id="O365-Android-Connect-outlook"
                },
                new CodeSample { /* Angular */
                   Name="My Angular App",
                   RedirectUri="http://localhost:8080/login",
                   Public = true,
                   V1Link = null,
                   Repo = GetRepo("option-angular-outlook"),
                   AllowImplicitFlow = true,
                   Id="option-angular-outlook"
                },
                new CodeSample { /* ASP.NET MVC */
                   Name="My ASP.NET App",
                   RedirectUri="http://localhost:55065",
                   Public = false,
                   V1Link = null,
                   Repo = GetRepo("option-dotnet-mail-api"),
                   AllowImplicitFlow = true,
                   Id="option-dotnet-mail-api"
                },
                new CodeSample { /* iOS Swift  */
                   Name="My iOS Swift App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/ios-swift-connect-rest-sample",
                   Repo = GetRepo("O365-iOS-Swift-Connect-outlook"),
                   AllowImplicitFlow = false,
                   Id="O365-iOS-Swift-Connect-outlook"
                },
                new CodeSample { /* iOS Swift  SDK*/
                   Name="My iOS Swift App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/ios-swift-connect-rest-sample",
                   Repo = GetRepo("O365-iOS-Swift-sdk-Connect-outlook"),
                   AllowImplicitFlow = false,
                   Id="O365-iOS-Swift-sdk-Connect-outlook"
                },
                new CodeSample { /* iOS Objective C */
                   Name="My iOS Objective C App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample",
                   Repo = GetRepo("O365-iOS-Objective-C-Connect-outlook"),
                   AllowImplicitFlow = false,
                   Id="O365-iOS-Objective-C-Connect-outlook"
                },
                new CodeSample { /* iOS Objective C SDK*/
                   Name="My iOS Objective C App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample",
                   Repo = GetRepo("O365-iOS-Objective-C-sdk-Connect-outlook"),
                   AllowImplicitFlow = false,
                   Id="O365-iOS-Objective-C-sdk-Connect-outlook"
                },
                new CodeSample { /* Node */
                   Name="My Node.js App",
                   RedirectUri="http://localhost:3000/login",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/ios-objectivec-connect-rest-sample",
                   Repo = GetRepo("option-node-outlook"),
                   AllowImplicitFlow = false,
                   Id="option-node-outlook"
                },
                new CodeSample { /* PHP */
                   Name="My PHP App",
                   RedirectUri="http://localhost:8000/oauth.php",
                   Public = false,
                   V1Link = null,
                   Repo = GetRepo("option-php-outlook"),
                   AllowImplicitFlow = false,
                   Id="option-php-outlook"
                },
                new CodeSample { /* Ruby */
                   Name="My Ruby App",
                   RedirectUri="http://localhost:3000/auth/microsoft_v2_auth/callback",
                   Public = false,
                   V1Link = null,
                   Repo = GetRepo("option-node-outlook"),
                   AllowImplicitFlow = false,
                   Id="option-ruby-outlook"
                },
                new CodeSample { /* UWP */
                   Name="My UWP App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/tree/last_v1_auth",
                   Repo = GetRepo("option-windowsuniversal-outlook"),
                   AllowImplicitFlow = false,
                   Id="option-windowsuniversal-outlook"
                },
                new CodeSample { /* UWP SDK*/
                   Name="My UWP App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://github.com/microsoftgraph/uwp-csharp-connect-rest-sample/tree/last_v1_auth",
                   Repo = GetRepo("option-windowsuniversal-sdk-outlook"),
                   AllowImplicitFlow = false,
                   Id="option-windowsuniversal-sdk-outlook"
                },
                new CodeSample { /* Xamarin */
                   Name="My Xamarin App",
                   RedirectUri="http://localhost:8000",
                   Public = true,
                   V1Link = "https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-xamarin",
                   Repo = GetRepo("option-windowsuniversal-outlook"),
                   AllowImplicitFlow = false,
                   Id="Xamarin-Connect-outlook"
                }
            };
        }

        public CodeSample GetCodeSample(string codeSampleId)
        {
            CodeSample codeSample = null;
            foreach(var cs in CodeSamples)
            {
                if(cs.Id == codeSampleId)
                {
                    codeSample = cs;
                }
            }
            if(codeSample == null)
            {
                throw new ArgumentException(string.Format("Platform {0} not found in code sample factory", codeSampleId));
            }
            return codeSample;
        }
    }
}