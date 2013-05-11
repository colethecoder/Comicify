using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Comicify.Controllers
{
    public class ComicController : ApiController
    {
        public IEnumerable<string> Get()
        {
            return new List<string> {"rar", "boo"};
        }
    }
}
