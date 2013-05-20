using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comicify.Models;

namespace Comicify.Data
{
    public interface IComicRepository
    {
        FolderContent GetFolderContent(string path);
        Stream GetComicPage(string path, int page);
    }
}
