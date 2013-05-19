using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comicify.Data
{
    public class ConfigRepository
    {
        public string GetRootFolderFromConfig()
        {
            var basePath = ConfigurationSettings.AppSettings["ParentFolder"];
            if (basePath.Last() != '\\')
            {
                basePath += '\\';
            }
            return basePath;
        }
    }
}
