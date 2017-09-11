'use strict';

var data = (localStorage.getItem('bookmarks')) ? JSON.parse(localStorage.getItem('bookmarks')) : [];

renderBookmarks();

function renderBookmarks() {
    for(var i = 0; i < data.length; i++) {
        addBookmarkToDOM(data[i].name, data[i].url);
    }
}

function dataUpdate() {
    localStorage.setItem('bookmarks', JSON.stringify(data));
}

function addBookmark(n, u) {
    addBookmarkToDOM(n, u);

    data.push( {name: n, url: u} );
    dataUpdate();

    document.getElementById('website_name').value = '';
    document.getElementById('website_url').value = '';
}

function removeBookmark() {
    var bookmarkToDelete = this.parentNode.parentNode;
    var bookmarkToDeleteUrl = this.previousSibling.firstChild.href.slice(0, this.previousSibling.firstChild.href.length - 1);
    console.log(bookmarkToDeleteUrl);
    console.log(data[0].url);

    for(var i = 0; i < data.length; i++) {
        if (data[i].url === bookmarkToDeleteUrl) {
            data.splice(i, 1);
        }
    }

    dataUpdate();

    bookmarkToDelete.remove();
}

function addBookmarkToDOM(n, u) {
    var bookmarks = document.getElementById('bookmarks');

    var item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = "<div class='easy'>" + n + "</div>";

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('btn');
    remove.innerText = "Remove";
    remove.addEventListener('click', removeBookmark);

    var go = document.createElement('button');
    go.classList.add('btn');
    go.innerHTML = "<a target='_blank' href='" + u + "'>Go</a>";

    buttons.appendChild(go);
    buttons.appendChild(remove);
    item.appendChild(buttons);
    bookmarks.appendChild(item);
}

function isUrlValid(input) {
    var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null) {
        return false;
    } else {
        return true;
    }
}

document.getElementById('add_bookmark').addEventListener('click', function(){
    var name = document.getElementById('website_name').value;
    var url = document.getElementById('website_url').value;


    if(name && url && isUrlValid(url)) {
        addBookmark(name, url);
    } else {
        alert('There is no data or it is incorrect!');
    }
});