using System;
using System.Collections.Generic;
using System.Configuration;
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
        
        public FolderContent Get(string path = null)
        {
            if (string.IsNullOrWhiteSpace(path))
            {
                path = ConfigurationSettings.AppSettings["ParentFolder"];
            }
            return _comicRepository.GetFolderContent(path);
        }

    }
}
