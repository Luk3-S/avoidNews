//let testDiv = document.getElementById('test');
var txt = "<ul>";
chrome.storage.sync.get('sites_to_replace', function (data) {
  initList(data.sites_to_replace);
});

function initList(site_list) {
  site_list.forEach(buildList);
  txt = txt + "</ul>";
  var done =txt;
  //return done;
  document.getElementById("siteListDiv").innerHTML = done;
  txt = "";

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
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  var curr = document.getElementById(tabName);
  document.getElementById(tabName).style.display = "block";
  curr.className += " active";
}

document.getElementById("linksButton").addEventListener('click', openTab.bind(null, "replacedLinks"));
document.getElementById("optionsButton").addEventListener('click', openTab.bind(null, "optionsPage"));


// $("#saveAddition").click(function () {
//   console.log("hrer")
//       chrome.storage.sync.get('sites_to_replace', function (data) {
//         $.ajax({
//           data: data.sites_to_replace, success: function (result) {
//           console.log("data: "+data.sites_to_replace);
//             $("#siteListDiv").html(initList(data.sites_to_replace));
//           }
//         });
//       });
//     })