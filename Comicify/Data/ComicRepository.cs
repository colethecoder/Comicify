using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comicify.Models;

namespace Comicify.Data
{
    public class ComicRepository : IComicRepository
    {
        public FolderContent GetFolderContent(string path)
        {
            var content = new FolderContent();
            content.Path = path;
            content.Folders = (from directory in Directory.GetDirectories(path) select new Folder{Path = directory, Name = directory.Split('\\').Last()}).ToList();
            content.Comics = (from file in Directory.GetFiles(path, "*.cbr") select new Comic { Path = file, Name = file.Split('\\').Last() }).ToList();
            content.Comics.AddRange(from file in Directory.GetFiles(path, "*.cbz") select new Comic { Path = file, Name = file.Split('\\').Last() });
            return content;
        }
    }
}
