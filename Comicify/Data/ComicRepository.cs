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
        private ConfigRepository _configRepository = new ConfigRepository();
        
        public FolderContent GetFolderContent(string path)
        {
            var content = new FolderContent();
            content.Path = TrimPath(path);
            content.Folders = (from directory in Directory.GetDirectories(path) select new Folder { Path = TrimPath(directory), Name = directory.Split('\\').Last() }).ToList();
            content.Comics = (from file in Directory.GetFiles(path, "*.cbr") select new Comic { Path = TrimPath(file), Name = file.Split('\\').Last() }).ToList();
            content.Comics.AddRange(from file in Directory.GetFiles(path, "*.cbz") select new Comic { Path = TrimPath(file), Name = file.Split('\\').Last() });
            return content;
        }

        private string TrimPath(string path)
        {
            var basePath = _configRepository.GetRootFolderFromConfig();
            path = path.Replace(basePath, string.Empty);
            return path.Replace('\\', '/');
        }
    }
}
