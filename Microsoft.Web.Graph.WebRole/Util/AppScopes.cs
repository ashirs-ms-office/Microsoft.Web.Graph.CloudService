using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Graph.GettingStarted.Utils
{
    public enum Resources
    {
        Graph,
        Exchange,
        SharePoint,
        UnifiedAPI
    };

    public enum Scopes
    {
        WAADUserProfileRead,
        MailRead,
        MailWrite,
        MailSend,
        CalendarsRead,
        CalendarsWrite,
        ContactsRead,
        ContactsWrite,
        FilesRead,
        FilesWrite,
        UsersRead,
        UsersWrite,
        GroupsRead,
        GroupsWrite,
        UserProfileRead
    };

    public static class AppScopes
    {
        private static Scopes firstExchangeScope = Scopes.MailRead;
        private static Scopes firstSharePointScope = Scopes.FilesRead;
        private static Scopes firstUnifiedAPIScope = Scopes.UsersRead;

        private static Dictionary<string, Scopes> scopeFromName = new Dictionary<string, Scopes>()
        {
            { "WAADUserProfile.Read", Scopes.WAADUserProfileRead },    
            { "UserProfile.Read", Scopes.UserProfileRead },            
            { "Mail.Read", Scopes.MailRead },
            { "Mail.Write", Scopes.MailWrite },
            { "Mail.Send", Scopes.MailSend },
            { "Calendars.Read", Scopes.CalendarsRead },
            { "Calendars.Write", Scopes.CalendarsWrite },
            { "Contacts.Read", Scopes.ContactsRead },
            { "Contacts.Write", Scopes.ContactsWrite },
            { "Files.Read", Scopes.FilesRead },
            { "Files.Write", Scopes.FilesWrite },
            { "Users.Read", Scopes.UsersRead },
            { "Users.Write", Scopes.UsersWrite },
            { "Groups.Read", Scopes.GroupsRead },
            { "Groups.Write", Scopes.GroupsWrite },
        };
        
        private static Dictionary<Scopes, string> scopeIds = new Dictionary<Scopes, string>()
        {
            { Scopes.UserProfileRead, "e1fe6dd8-ba31-4d61-89e7-88639da4683d" },//unified api sign in user and read profile.
            { Scopes.WAADUserProfileRead, "311a71cc-e848-46a1-bdf8-97ff7156d8e6"}, //  for sign in user
            { Scopes.MailRead, "570282fd-fa5c-430d-a7fd-fc8dc98a9dca" }, //unified api
            { Scopes.MailWrite, "024d486e-b451-40bb-833d-3e66d98c5c73" }, //unified api
            { Scopes.MailSend, "e383f46e-2787-4529-855e-0e479a3ffac0" },//unified api
            { Scopes.CalendarsRead, "465a38f9-76ea-45b9-9f34-9e8b0d4b0b42" },//unified api
            { Scopes.CalendarsWrite, "1ec239c2-d7c9-4623-a91a-a9775856bb36" },//unified api
            { Scopes.ContactsRead, "ff74d97f-43af-4b68-9f2a-b77ee6968c5d" },//unified api
            { Scopes.ContactsWrite, "d56682ec-c09e-4743-aaf4-1a3aac4caa21" },//unified api
            { Scopes.FilesRead, "10465720-29dd-4523-a11a-6a75c743c9d9" },//Read user files and files shared with user
            { Scopes.FilesWrite, "5c28f0bf-8a70-41f1-8ab2-9032436ddb65" },//Have full access to user files and files shared with
            { Scopes.UsersRead, "a154be20-db9c-4678-8ab7-66f6cc099a59" }, //read all users' full profile
            { Scopes.UsersWrite, "204e0828-b5ca-4ad8-b9f3-f32a958e7cc4" }, //read and write all users' full profile
            { Scopes.GroupsRead, "5f8c59db-677d-491f-a6b8-5f174b11ec1d" }, // read all groups
            { Scopes.GroupsWrite, "4e46008b-f24c-477d-8fff-7bb4ec7aafe0" }, //read and write all groups
        };

        private static Dictionary<Resources, string> resourceIds = new Dictionary<Resources, string>()
        {
            { Resources.Graph, "00000002-0000-0000-c000-000000000000" },
            //{ Resources.Exchange, "00000002-0000-0ff1-ce00-000000000000" },
            //{ Resources.SharePoint, "00000003-0000-0ff1-ce00-000000000000" },
            { Resources.UnifiedAPI, "00000003-0000-0000-c000-000000000000" },
        };

        public static Resources GetScopeResource(Scopes scope)
        {
            if (scope < firstExchangeScope)
                return Resources.Graph;
            //else if (scope < firstSharePointScope)
            //    return Resources.Exchange;
            //else if (scope < firstUnifiedAPIScope)
            //    return Resources.SharePoint;
            return Resources.UnifiedAPI;
        }

        public static List<Scopes> GetApplicableScopes(string[] scopeNames)
        {
            List<Scopes> applicableScopes = new List<Scopes>() { Scopes.UserProfileRead, Scopes.WAADUserProfileRead };
            foreach (string name in scopeNames)
            {
                if (!applicableScopes.Contains(scopeFromName[name]))
                    applicableScopes.Add(scopeFromName[name]);
            }

            // Remove redundant scopes
            if (applicableScopes.Contains(Scopes.MailWrite))
                applicableScopes.Remove(Scopes.MailRead);

            if (applicableScopes.Contains(Scopes.CalendarsWrite))
                applicableScopes.Remove(Scopes.CalendarsRead);

            if (applicableScopes.Contains(Scopes.ContactsWrite))
                applicableScopes.Remove(Scopes.ContactsRead);

            if (applicableScopes.Contains(Scopes.UsersWrite))
                applicableScopes.Remove(Scopes.UsersRead);

            if (applicableScopes.Contains(Scopes.GroupsWrite))
                applicableScopes.Remove(Scopes.GroupsRead);

            return applicableScopes;
        }

        public static string GetScopeId(Scopes scope)
        {
            return scopeIds[scope];
        }

        public static string GetResourceId(Resources resource)
        {
            return resourceIds[resource];
        }
    }
}
