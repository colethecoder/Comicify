using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Comicify.Data;

namespace Comicify.Controllers
{
    public class ComicController : ApiController
    {
        private IComicRepository _comicRepository = new ComicRepository();
        
        public IEnumerable<string> Get(string[] path)
        {
            throw new NotImplementedException();
        }

    }
}
