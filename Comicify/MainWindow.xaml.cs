using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.SelfHost;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Comicify
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Worker workerObject = new Worker();
            Thread workerThread = new Thread(workerObject.DoWork);

            // Start the worker thread.
            workerThread.Start();
        }
    }

    public class Worker
    {
        // This method will be called when the thread is started.
        public void DoWork()
        {

            var config = new HttpSelfHostConfiguration("http://localhost:8080");

            config.Routes.MapHttpRoute("Web Default", "", new {controller="Web", action="GetFile", filename="index.html"});

            config.Routes.MapHttpRoute("Web Files", "web/{filename}",
                new {controller = "Web", action = "GetFile", filename = RouteParameter.Optional});               

            config.Routes.MapHttpRoute(
                "API Default", "api/{controller}/{*path}",
                new {path = RouteParameter.Optional});

            using (HttpSelfHostServer server = new HttpSelfHostServer(config))
            {
                server.OpenAsync().Wait();
                while (true)
                {
                }
            }
        }
    }
}
