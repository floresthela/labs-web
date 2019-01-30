/*https://floresthela.github.io/labs-web/lab2-todolist/*/

var doneItems = document.getElementById("done");
var ul = document.getElementById("lista");
let deleteButton = document.getElementById("delete");


setInterval(check, 1000);

/* agrega un nuevo elemento a la lista, su checkbox y el texto (span) */
function addItem(){

	var item = document.getElementById("input").value;

	if(item == "" || item == null){
	// si no se ingresó nada y solo se oprimió Enter
		alert("New item is empty");
	}

	else{
		var li = document.createElement("li");
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "todo";
		//checkbox.value = "todo_items";
		checkbox.id = "id";
		checkbox.autocomplete = "off";

		li.appendChild(checkbox);

		var newspan = document.createElement("span");
		var text = document.createTextNode(item);
		newspan.appendChild(text);
		
		li.appendChild(newspan);
		ul.appendChild(li);
		bindTaskEvents
		document.getElementById("input").value = "";
		console.log("nuevo item");
		}
}

/* al presionar enter se manda llamar la función para agregar un nuevo elemento a la lista*/
document.body.onkeyup = function(e) {
	if (e.keyCode == 13) {
		addItem();
	}
}

var itemCompleted = function(){
	console.log("Completada...");
	var listItem = this.parentNode;
	doneItems.appendChild(listItem);
	bindTaskEvents(listItem,ul);
	
	//ul.removeChild(listItem);

}

var itemIncomplete = function(){
	console.log("falta...");
	var listItem = this.parentNode;
	ul.appendChild(listItem);
	bindTaskEvents(listItem,doneItems);

	//doneItems.removeChild(listItem);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	checkbox.onchange = checkBoxEventHandler;
}

// borra todos los elementos ya completados
deleteButton.addEventListener("click",function() {
	console.log("borrando completados...")
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

