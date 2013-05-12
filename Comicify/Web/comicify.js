var ViewModel = {
    Path: ko.observable(''),
    Folders: ko.observableArray(),
    Comics: ko.observableArray(),
    SelectedComicPath: ko.observable(''),
    CurrentPageNumber: ko.observable(1),
    CurrentPagePath: ko.observable('')
};

$(function () {
    $("body").on('click', '.FolderLink', function (event) {
        alert('yoyo1');
        ViewModel.Path($(this).attr('data-fullPath'));
    });

    ko.applyBindings(ViewModel);
    LoadFolderContent();
});

ViewModel.Path.subscribe(function (newValue) {
    alert('yoyo');
    LoadFolderContent();
});

function LoadFolderContent() {
    $.getJSON('../api/Folder', { path: ViewModel.Path }, function (data) {
        ViewModel.Folders(data.Folders);
        ViewModel.Comics(data.Comics);
    });
}