var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var tableRow = document.getElementById("tableRow");
var siteUrlFeedback = document.getElementById("siteUrlFeedback");
var siteNameFeedback = document.getElementById("siteNameFeedback");
var siteList = [];

if (localStorage.getItem("list") != null) {
  siteList = JSON.parse(localStorage.getItem("list"));
  display(siteList);
}
addBtn.onclick = function () {
  addSite();
};
function addSite() {
  if(urlRegex()==true && nameRegex()==true && includeName()==false){
    var site = {
      siteName: siteName.value,
      siteUrl: siteUrl.value,
    };
    siteList.push(site);
    localStorage.setItem("list", JSON.stringify(siteList));
    display(siteList);
    reset();
  }
  else
  notValid();
}
function display(list) {
  var box = ``;
  for (var i = 0; i < list.length; i++) {
    box += `<tr >
        <td>${i + 1}</td>
        <td>${list[i].siteName}</td>
        <td> <button class="btn btn-success  text-white  "><a target="_blank" href="${list[i].siteUrl}"><i class="fa-regular fa-eye pe-2"></i>Visit</a>
        <td> <button class="btn btn-danger" onclick="deleteFun(${i});"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </button></td>
    </tr>`;
  }
  tableRow.innerHTML = box;
}
function reset() {
  siteName.value = "";
  siteUrl.value = "";
  siteNameFeedback.innerHTML = "";
  siteUrlFeedback.innerHTML = "";
}
function deleteFun(index) {
  siteList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(siteList));
  display(siteList);
}
function searchSite(term) {
  var searchList = [];
  for(var i = 0 ; i < siteList.length; i++){
    if(siteList[i].siteName.toLowerCase().includes(term.toLowerCase())===true){
      searchList.push(siteList[i])
    }
  }
  display(searchList);
}
function urlRegex() {
  var regex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return regex.test(siteUrl.value);
}
function nameRegex() {
  var regex = /^[a-z]{3,}$/;
  return regex.test(siteName.value);
}
function includeName() {
  for(var i = 0 ; i < siteList.length; i++){
    if(siteList[i].siteName.toLowerCase()===siteName.value.toLowerCase()){
      return true;
    }
  }
  return false;
}
function notValid() {
  if (!urlRegex()) {
    if ((siteUrl.value == ""))
    siteUrlFeedback.innerHTML = "Url is required";
    else siteUrlFeedback.innerHTML = "Pattern is not mached";
  }
  if (!nameRegex()) {
    if (siteName.value == "")
    siteNameFeedback.innerHTML = "Name is required";
    else siteNameFeedback.innerHTML = "Pattern is not mached";
  }
  if(includeName()==true && siteName.value != ""){
    siteNameFeedback.innerHTML = "This Name is already exists";
  }
}

