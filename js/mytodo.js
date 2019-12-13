
function addMyTodo() {
    let btn = document.querySelector('#add-list');
    btn.addEventListener('click', addFunc);
    loadToDos();
}

function addItem(item) {
    const db = window.localStorage;
    const list = document.querySelector('#unordered-list');
    const node = document.createRange().createContextualFragment(db.getItem(item));
    list.appendChild(node);
}

function loadToDos() {
    const db = window.localStorage;
    Object.keys(db).forEach(addItem);

}

function checkBoxUpdate(cb) {
    if (cb.checked) {
        cb.setAttribute('checked', cb.checked);
    } else {
        cb.removeAttribute('checked');
    }
    const itemString = new XMLSerializer().serializeToString(cb.parentNode);
    const id = cb.id;
    window.localStorage.setItem(id, itemString);
}



function addFunc(event) {
    event.preventDefault();

    const todo = document.querySelector('#textbox');
    const value = todo.value.trim();

    if (value.length > 0) {
        const hash = (Date.now().toString(36).substr(2, 4) + performance.now().toString(36).replace('.','').substr(0, 4) + Math.random().toString(36).substr(3, 4)).toUpperCase();

        const id = `checkboxid-${hash}`;
        const template = document.querySelector('#template_list');
        const item = document.importNode(template.content, true);
        const label = item.querySelector('label[for]');
        const input = item.querySelector('#checkboxid')
        const list = document.querySelector('#unordered-list');

        input.setAttribute('id', id);
        label.setAttribute('for', id);

        label.textContent = value;
        const db = window.localStorage;
        const itemString = new XMLSerializer().serializeToString(item);
        db.setItem(id, itemString);


        list.appendChild(item);
    }

    todo.value = '';
}


function todo_Delete(elem){

    elem.parentElement.classList.toggle('unorderedlistDelete');
    elem.parentElement.addEventListener('animationend',functevent);
}
function functevent(event){
    //alert("animation is stopped");
    const key= this.querySelector("input[type=checkbox]").id;
    //alert("key"+key);
    const dataObj = window.localStorage;
    dataObj.removeItem(key);
    //alert(this.parentNode.id)
    const parent = this.parentElement;
    parent.removeChild(this);

    //this.remove();
    //const elem = document.querySelector(".list")
    
}


addMyTodo();