var todo_items = 5; // tal vez borrar
var doneItems = document.getElementById("done");
var ul = document.getElementById("lista");
let deleteButton = document.getElementById("delete");


setInterval(check, 1000);

/* agrega un nuevo elemento a la lista, su checkbox y el texto (span) */
function addItem(){

	todo_items += 1;
	var item = document.getElementById("input").value;
	var li = document.createElement("li");
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.name = "todo";
	checkbox.value = "todo_items";
	checkbox.id = "id";
	li.appendChild(checkbox);

	var newspan = document.createElement("span");
	var text = document.createTextNode(item);
	newspan.appendChild(text);
	
	li.appendChild(newspan);
	ul.appendChild(li);
	bindTaskEvents
	document.getElementById("input").value = "";
	console.log(ul);
}

/* al presionar enter se manda llamar la función para agregar un nuevo elemento a la lista*/
document.body.onkeyup = function(e) {
	if (e.keyCode == 13) {
		addItem();
	}
}

var itemCompleted = function(){
	console.log("Completada");
	var listItem = this.parentNode;
	doneItems.appendChild(listItem);
	bindTaskEvents(listItem,ul);
	
	ul.removeChild(listItem);

}

var itemIncomplete = function(){
	var listItem = this.parentNode;
	ul.appendChild(listItem);
	bindTaskEvents(listItem,doneItems);

	doneItems.removeChild(listItem);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	checkbox.onchange = checkBoxEventHandler;
}

/*var deleteItem = function() {
	console.log("borrar item...");
	var myNode = document.getElementById("foo");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

}*/

deleteButton.addEventListener("click",function() {
	while(doneItems.firstChild) {
		doneItems.removeChild(doneItems.firstChild);
	}
});

function check(){
	for(var i = 0; i < ul.children.length; i++){
		bindTaskEvents(ul.children[i], itemCompleted);
	}

	for(var i = 0; i < doneItems.children.length; i++){
		bindTaskEvents(doneItems.children[i], itemIncomplete);
	}
}


/**/

