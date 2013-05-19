function ViewModel() {
    this.Path = ko.observable('');
    this.Folders = ko.observableArray();
    this.Comics = ko.observableArray();
    this.SelectedComicPath = ko.observable('');
    this.CurrentPageNumber = ko.observable(1);
    this.CurrentPagePath = ko.observable('');
    this.fullName = ko.computed(function () {
        return this.firstName() + " " + this.lastName();
    }, this);
};

$(function () {
    $("body").on('click', '.FolderLink', function (event) {
        ViewModel.Path($(this).attr('data-fullPath'));
    });
    
    $("body").on('click', '.ComicLink', function (event) {
        ViewModel.SelectedComicPath($(this).attr('data-fullPath'));
    });

    ko.applyBindings(new ViewModel());
    LoadFolderContent();
});

ViewModel.Path.subscribe(function (newValue) {
    LoadFolderContent();
});

function LoadFolderContent() {
    $.getJSON('../api/Folder', { path: ViewModel.Path }, function (data) {
        ViewModel.Folders(data.Folders);
        ViewModel.Comics(data.Comics);
    });
}