using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comicify.Models;

namespace Comicify.Data
{
    public interface IComicRepository
    {
        FolderContent GetFolderContent(string path);
    }
}
