let testDiv = document.getElementById('test');
var txt = "<ul>";
chrome.storage.sync.get('sites_to_replace', function (data) {
    initList(data.sites_to_replace);
});

function initList(site_list) {

    site_list.forEach(buildList);
    txt = txt + "</ul>";
    document.getElementById("test").innerHTML = txt
}

function buildList(value, index, array) {
    txt = txt + "<li>" + value + "</li>";
}