//let testDiv = document.getElementById('test');
var txt = "<ul>";
chrome.storage.sync.get('sites_to_replace', function (data) {
    initList(data.sites_to_replace);
});

function initList(site_list) {
    site_list.forEach(buildList);
    txt = txt + "</ul>";
    document.getElementById("siteListDiv").innerHTML = txt
}

function buildList(value, index, array) {
    txt = txt + "<li>" + value + "</li>";
}



function openTab(tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < 2; i++) { // < tabcontent.length
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < 2; i++) {
        console.log(i)
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    var curr = document.getElementById(tabName);
    console.log("here: "+curr +" "+ tabName)
    document.getElementById(tabName).style.display = "block";
    curr.className += " active";
}

  document.getElementById("linksButton").addEventListener('click',openTab.bind(null,"replacedLinks"));
  document.getElementById("optionsButton").addEventListener('click',openTab.bind(null,"optionsPage"));
