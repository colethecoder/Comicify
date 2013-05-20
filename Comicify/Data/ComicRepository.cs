using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Comicify.Models;
using SharpCompress.Archive;
using SharpCompress.Archive.Zip;
using SharpCompress.Reader;
using SharpCompress.Reader.Rar;
using SharpCompress.Reader.Zip;

namespace Comicify.Data
{
    public class ComicRepository : IComicRepository
    {
        private ConfigRepository _configRepository = new ConfigRepository();
        
        public FolderContent GetFolderContent(string path)
        {
            var content = new FolderContent();
            content.Path = TrimPath(path);
            content.Folders = (from directory in Directory.GetDirectories(path) orderby directory select new Folder { Path = TrimPath(directory), Name = directory.Split('\\').Last() }).ToList();
            content.Comics = (from file in Directory.GetFiles(path, "*.cb*") orderby file select new Comic { Path = TrimPath(file), Name = file.Split('\\').Last() }).ToList();
            //content.Comics.AddRange(from file in Directory.GetFiles(path, "*.cbz") select new Comic { Path = TrimPath(file), Name = file.Split('\\').Last() });
            return content;
        }

        public Stream GetComicPage(string path, int page)
        {
            path = _configRepository.GetRootFolderFromConfig() + (path == null ? string.Empty : path.Replace('/', '\\'));

            var zip = ArchiveFactory.Open(path);
            var pageEntry = zip.Entries.Where(x=>!x.IsDirectory).OrderBy(x => x.FilePath).ElementAt(page-1);
            var stream = new MemoryStream();            
            pageEntry.WriteTo(stream);
            stream.Position = 0;
            return stream;           
        }

        private IReader GetReader(string path, Stream stream)
        {
            if (path.EndsWith("cbr"))
            {
                return RarReader.Open(stream);
            }
            if (path.EndsWith("cbz"))
            {
                return ZipReader.Open(stream);
            }
            return ReaderFactory.Open(stream);
        }

        private string TrimPath(string path)
        {
            var basePath = _configRepository.GetRootFolderFromConfig();
            path = path.Replace(basePath, string.Empty);
            return path.Replace('\\', '/');
        }
    }
}
