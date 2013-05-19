using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Comicify.Data;
using SharpCompress.Reader;

namespace Comicify.Controllers
{
    public class ComicController : ApiController
    {
        private IComicRepository _comicRepository = new ComicRepository();
        private ConfigRepository _configRepository = new ConfigRepository();
        
        public HttpResponseMessage Get(string path, int? page = 1)
        {
            path = _configRepository.GetRootFolderFromConfig() + (path == null ? string.Empty : path.Replace('/', '\\'));

            using (Stream stream = System.IO.File.OpenRead(path))
            {
                var reader = ReaderFactory.Open(stream);
                var i = 1;
                while (reader.MoveToNextEntry())
                {
                    if (!reader.Entry.IsDirectory && i == page)
                    {
                        var response = new HttpResponseMessage();
                        response.Content = new StreamContent(reader.OpenEntryStream());
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                        return response;
                    }
                    i++;
                }
            }
            return null;
        }
    }
}
