function ViewModel() {
    var self = this;
    self.Path = ko.observable('');
    self.Folders = ko.observableArray();
    self.Comics = ko.observableArray();
    self.ModeSwitch = ko.observable(false);
    self.ComicSelected = ko.observable(false);
    self.CurrentPageNumber = ko.observable(1);

    self.NextPage = function () {
        self.CurrentPageNumber(self.CurrentPageNumber() + 1);
    };
    
    self.PreviousPage = function () {
        if (self.CurrentPageNumber() == 1) {
            self.deselectComic();
        } else {
            self.CurrentPageNumber(self.CurrentPageNumber() - 1);
        }
    };

    self.navigateToFolder = function (folder) {
        console.log(folder.Path);
        self.Path(folder.Path);
    };
    
    self.navigateBack = function () {
        console.log(self.PreviousPath());
        self.Path(self.PreviousPath());
    };

    self.selectComic = function (comic) {
        console.log(comic.Path);
        self.ModeSwitch(true);
        self.Path(comic.Path);
        self.CurrentPageNumber(1);
        self.ComicSelected(true);
        self.ModeSwitch(false);
        $('#comicPage').load(function() {
            ResizeImage();
        });
    };

    self.deselectComic = function() {
        self.ComicSelected(false);        
        $.mobile.changePage("#navigation");
    };

    self.Path.subscribe(function (newValue) {        
        self.LoadFolderContent();
    });

    self.LoadFolderContent = function () {
        if (!self.ModeSwitch()) {
            $.getJSON('../api/Folder/' + self.Path(), null, function(data) {
                self.Folders(data.Folders);
                self.Comics(data.Comics);
            });
        }
    };

    self.CurrentPagePath = ko.computed(function() {
        return '../api/Comic/' + self.Path() + '?page=' + self.CurrentPageNumber();
    }, this);
    
    self.PreviousPath = ko.computed(function () {
        var pathArray = self.Path().split("/");
        if (pathArray.length < 2) {
            return "";
        }
        pathArray = pathArray.slice(0, pathArray.length - 1);
        var result = pathArray.join("/");
        return result;
    }, this);

    self.Root = ko.computed(function () {
        return self.Path() == "";
    });

    self.LoadFolderContent();
};

var viewModel = new ViewModel();

$(function () {
    ko.applyBindings(viewModel);
    
    $('#comic').on("swipeleft","#comicPage", function (event) {
        viewModel.NextPage();
    });
    
    $('#comic').on("swiperight", "#comicPage", function (event) {
        viewModel.PreviousPage();
    });

    $('#comic').on("tap", "#comicPage", function(event) {
        viewModel.deselectComic();
    });
    
    $("body").keyup(function (e) {
        if (e.keyCode == 37) { // left
            viewModel.PreviousPage();
        }
        else if (e.keyCode == 39) { // right
            viewModel.NextPage();
        } else if (e.keyCode == 27) { // esc
            viewModel.deselectComic();
        }
    });
    
    

    ResizeImage();
    
    $(window).resize(function () {
        ResizeImage();
    });
    

});

function ResizeImage() {
    var $i = $('img#comicPage');
    var $c = $i.parent();
    $c.height($(window).height()-10);
    var i_ar = $i.width() / $i.height(), c_ar = $c.width() / $c.height();    
    $i.width(i_ar > c_ar ? $c.width() : $c.height() * (i_ar));    
}

window.addEventListener("load", function () {
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 0);
});




