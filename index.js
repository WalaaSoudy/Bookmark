var bookmark = []
var bookmarkName = document.getElementById('bookmarkName')
var bookmarkURL = document.getElementById('bookmarkURL')
if (localStorage.getItem('bookMark') != null) {
    bookmark = JSON.parse(localStorage.getItem('bookMark'))
    display()
}
function addWebsite()
{
    var bookmarkName = document.getElementById('bookmarkName').value;
    var bookmarkURL = document.getElementById('bookmarkURL').value;
     obj={
        bookmarkName : bookmarkName,
        bookmarkURL : bookmarkURL
    }
    if(checkName(bookmarkName) &&(isValidUrl(bookmarkURL)))
    {
        bookmark.push(obj)
        localStorage.setItem('bookMark', JSON.stringify(bookmark))
    }
    else
    {
        alert('invalidSite name must contain at least 3 characters and Site URL must be a valid one ')
    }
    
    console.log(bookmark)
    display()
    clearInput()
}
const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}
function checkName(siteName)
{
var regex = /[a-zA-z]{3,}/
return(regex.test(siteName))
}
function clearInput() {
    bookmarkName.value = ""
    bookmarkURL.value = ""
  }
function display()
{   
    var cartona = ''
    for(var i = 0 ; i < bookmark.length ; i++)
    {
        cartona += `
        <tr>
        <td>${i+1}</td> 
        <td>${bookmark[i].bookmarkName}</td>  
        <td> <button class="btn btn-visit btn-success" onclick="visitItem(${i})">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </button></td>
        <td>
        <button onclick="deleteItem(${i})" class="btn btn-danger">DELETE</button>
        </td>
      </tr>`
    }
    document.getElementById('tableContent').innerHTML = cartona 
   
}

    

function deleteItem(index) {
        bookmark.splice(index, 1)
        localStorage.setItem('bookMark', JSON.stringify(bookmark))
        display()
    
  }

  function visitItem(index) {
    if (isValidUrl(bookmark[index].bookmarkURL)) {
      window.open(bookmark[index].bookmarkURL, '_blank');
    } else {
      alert('Invalid URL!');
    }
  }

