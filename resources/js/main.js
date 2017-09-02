'use strict';


function removeItem(e) {
    var item_to_remove = this.parentNode.parentNode;

    item_to_remove.remove();
}

function addBookmark(name_value, url_value) {

    var list = document.getElementById('bookmarks');

    var item = document.createElement('li');
    item.innerText = name_value;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var go = document.createElement('button');
    go.innerHTML = "<a target='_blank' href='" + url_value + "'>" + "Go</a>";

    var remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', removeItem);

    buttons.appendChild(remove);
    buttons.appendChild(go);
    item.appendChild(buttons);
    list.appendChild(item);

}

document.getElementById('add_bookmark').addEventListener('click', function(){
    var name_value = document.getElementById('website_name').value;
    var url_value = document.getElementById('website_url').value;

   if(name_value && url_value) {
       addBookmark(name_value, url_value);
       document.getElementById('website_name').value = '';
       document.getElementById('website_url').value = '';
   } else {
       console.log('There is no text!!');
   }
});
