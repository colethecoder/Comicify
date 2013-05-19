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
        self.CurrentPageNumber(self.CurrentPageNumber() - 1);
    };

    self.navigateToFolder = function (folder) {
        console.log(folder.Path);
        self.Path(folder.Path);
    };

    self.selectComic = function (comic) {
        console.log(comic.Path);
        self.ModeSwitch(true);
        self.Path(comic.Path);
        self.ComicSelected(true);
        self.ModeSwitch(false);
        $('#comicPage').load(function() {
            ResizeImage();
        });
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

    ResizeImage();
    
    $(window).resize(function () {
        ResizeImage();
    });
    

});

function ResizeImage() {
    var $i = $('img#comicPage');
    var $c = $i.parent();
    var i_ar = $i.width() / $i.height(), c_ar = $c.width() / $c.height();
    $i.width(i_ar > c_ar ? $c.width() : $c.height() * (i_ar));
}

window.addEventListener("load", function () {
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 0);
});




