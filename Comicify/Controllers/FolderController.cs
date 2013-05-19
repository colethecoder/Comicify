using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Comicify.Data;
using Comicify.Models;

namespace Comicify.Controllers
{
    public class FolderController : ApiController
    {
        private IComicRepository _comicRepository = new ComicRepository();
        private ConfigRepository _configRepository = new ConfigRepository();
        
        public FolderContent Get(string path = null)
        {
            path = _configRepository.GetRootFolderFromConfig() + (path == null ? string.Empty : path.Replace('/', '\\'));
            
            return _comicRepository.GetFolderContent(path);
        }        

    }
}
