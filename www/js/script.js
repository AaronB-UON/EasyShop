let API_KEY = 'AIzaSyDt1bFsILSNVpkj79CG41XL_Y3NSc0JNSs';

function addItem() 
{
    let item = prompt("Type the item you want to add");
    console.log(item);
}

function getStores(latitude, longitude)
{ 
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=Groceries&location=' + latitude + '%2C' + longitude + '&key=' + API_KEY;
    window.myxhr = new XMLHttpRequest();
    window.myxhr.open('GET', url, true);

    window.myxhr.addEventListener("progress", updateProgress);
    window.myxhr.addEventListener("load", transferComplete);
    window.myxhr.addEventListener("error", transferFailed);
    window.myxhr.addEventListener("abort", transferCanceled);

    window.myxhr.send();
}

//////////////// Geolocation methods ////////////////
function onGeoGetSuccess(position) {
    getStores(position.coords.latitude, position.coords.longitude);
}

// Throw an error if it occurs
function onGeoGetError() {
    alert('Error reading geolocation!');
}

// Get the current geolocation readings
function showStores() {
    navigator.geolocation.getCurrentPosition(onGeoGetSuccess, onGeoGetError);
}

function transferComplete(evt)
{
    var text = window.myxhr.responseText;
    window.myobj = JSON.parse(text);
    formatResponse();
}

function updateProgress(oEvent)
{
    var prog = document.getElementById("progress").innerHTML;
    if (prog === '+') // === means equal value AND same type
    {
        document.getElementById("progress").innerHTML = 'x';
    }
    else
    {
        document.getElementById("progress").innerHTML = '+';
    }
}

function transferFailed(evt)
{
    alert("An error occurred while transferring the file.");
}

function transferCanceled(evt)
{
    alert("The transfer has been cancelled by the user.");
}

function formatResponse()
{
    var aryResults = window.myobj.searchResults.results;
    //var myitems = aryResults.length;
    var strHTML = "";
    for (var ndx = 0; ndx < 5; ndx++)
    {
        strHTML += aryResults[ndx].results.name + '<br />' + '<br />';
    }
    document.getElementById("stores").style.display = "inline";
    document.getElementById("stores").innerHTML = strHTML;
}