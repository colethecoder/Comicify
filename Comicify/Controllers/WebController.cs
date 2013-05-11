using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Comicify.Controllers
{
    public class WebController : ApiController
    {
        public HttpResponseMessage GetFile(string filename)
        {
            var response = new HttpResponseMessage();
            using (StreamReader sr = new StreamReader(AssemblyDirectory + @"/Web/"+filename))
            {
                String line = sr.ReadToEnd();
                response.Content = new StringContent(line);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
                return response;
            }
            
            
        }

        static public string AssemblyDirectory
        {
            get
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                return Path.GetDirectoryName(path);
            }
        }
    }
}
