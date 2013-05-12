using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comicify.Models
{
    public class FolderContent
    {
        public string Path { get; set; }
        public List<Comic> Comics { get; set; }
        public List<Folder> Folders { get; set; }
    }
}
