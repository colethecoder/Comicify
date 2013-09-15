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
        self.LoadFirstPage();
    };

    self.deselectComic = function() {
        self.ComicSelected(false);        
        $.mobile.changePage("#navigation");
    };

    self.Path.subscribe(function (newValue) {        
        self.LoadFolderContent();
    });

    self.CurrentPageNumber.subscribe(function (newValue) {
        self.LoadFirstPage();
    });

    self.LoadFirstPage = function () {
        var pagesToLoad = [];
        if (self.CurrentPageNumber() < 3) {
            pagesToLoad = [1, 2, 3, 4, 5];
        } else {
            pagesToLoad = [self.CurrentPageNumber() - 2, self.CurrentPageNumber() - 1, self.CurrentPageNumber(), self.CurrentPageNumber() + 1, self.CurrentPageNumber() + 2];
        }
        var loadingArray = [];
        var toLoadArray = [];
        for (var i = 0; i < pagesToLoad.length; i++) {
            var pagePath = self.CurrentPagePath(pagesToLoad[i]);
            var found = false;
            for (var j = 0; j < self.PageList.length; j++) {
                if ($('img#'+self.PageList[j]).attr('src') == pagePath) {
                    loadingArray.push({ number: pagesToLoad[i], page: self.PageList[j], load: false});
                    found = true;
                }
            }
            if (!found) {
                toLoadArray.push(pagesToLoad[i]);
            }
        }

        var toLoadPagesArray = [];

        for (var j = 0; j < self.PageList.length; j++) {
            $('img#' + self.PageList[j]).hide();
            var foundPage = false;
            for (var i = 0; i < loadingArray.length; i++) {
                if (self.PageList[j] == loadingArray[i].page) {
                    foundPage = true;
                }
            }
            if (!foundPage) {
                toLoadPagesArray.push(self.PageList[j]);
            }
        }

        for (var i = 0; i < toLoadArray.length; i++) {
            loadingArray.push({number: toLoadArray[i], page: toLoadPagesArray[i], load: true});
        }
        console.log(loadingArray);
        for (var i = 0; i < loadingArray.length; i++) {
            if (loadingArray[i].load) {
                if (loadingArray[i].number == self.CurrentPageNumber()) {
                    $('img#' + loadingArray[i].page).one('load', function() {
                        console.log($(this));
                        $(this).show();
                        ResizeImage($(this));
                    }
                    ).attr('src', self.CurrentPagePath(loadingArray[i].number));
                } else {
                    $('img#' + loadingArray[i].page).one('load', function () {
                        console.log($(this));
                    }
                    ).attr('src', self.CurrentPagePath(loadingArray[i].number));
                }
            }
            if (loadingArray[i].number == self.CurrentPageNumber()) {
                $('img#' + loadingArray[i].page).show();
                ResizeImage($('img#' + loadingArray[i].page));
                console.log(loadingArray[i].page);
            }
        }
    };

    self.PageList = ['comicPageA', 'comicPageB', 'comicPageC', 'comicPageD', 'comicPageE'];

    self.LoadFolderContent = function () {
        if (!self.ModeSwitch()) {
            $.getJSON('../api/Folder/' + self.Path(), null, function (data) {
                self.Folders(data.Folders);
                self.Comics(data.Comics);
            });
        }
    };

    self.CurrentPagePath = function(pageNumber) {
        return '../api/Comic/' + self.Path() + '?page=' + pageNumber;
    };
    
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
    
    $('#comic').on("swipeleft","#comicPageA", function (event) {
        viewModel.NextPage();
    });
    $('#comic').on("swipeleft", "#comicPageB", function (event) {
        viewModel.NextPage();
    });
    $('#comic').on("swipeleft", "#comicPageC", function (event) {
        viewModel.NextPage();
    });
    $('#comic').on("swipeleft", "#comicPageD", function (event) {
        viewModel.NextPage();
    });
    $('#comic').on("swipeleft", "#comicPageE", function (event) {
        viewModel.NextPage();
    });
    
    $('#comic').on("swiperight", "#comicPageA", function (event) {
        viewModel.PreviousPage();
    });
    $('#comic').on("swiperight", "#comicPageB", function (event) {
        viewModel.PreviousPage();
    });
    $('#comic').on("swiperight", "#comicPageC", function (event) {
        viewModel.PreviousPage();
    });
    $('#comic').on("swiperight", "#comicPageD", function (event) {
        viewModel.PreviousPage();
    });
    $('#comic').on("swiperight", "#comicPageE", function (event) {
        viewModel.PreviousPage();
    });

    $('#comic').on("tap", "#comicPageA", function (event) {
        viewModel.deselectComic();
    });
    $('#comic').on("tap", "#comicPageB", function (event) {
        viewModel.deselectComic();
    });
    $('#comic').on("tap", "#comicPageC", function (event) {
        viewModel.deselectComic();
    });
    $('#comic').on("tap", "#comicPageD", function (event) {
        viewModel.deselectComic();
    });
    $('#comic').on("tap", "#comicPageE", function (event) {
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
    
    $(window).resize(function () {
        ResizeImage($('img#comicPageA'));
        ResizeImage($('img#comicPageB'));
        ResizeImage($('img#comicPageC'));
        ResizeImage($('img#comicPageD'));
        ResizeImage($('img#comicPageE'));
    });
    

});

function ResizeImage($i) {
    console.log('Resize '+$i.attr('id'));
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




