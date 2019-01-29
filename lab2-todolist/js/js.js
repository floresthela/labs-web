var todo_items = 5;

function addItem(){

	todo_items += 1;
	var item = document.getElementById("input").value;
	var ul = document.getElementById("lista");
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
	document.getElementById("input").value = "";
	console.log(todo_items);
}

document.body.onkeyup = function(e) {
	if (e.keyCode == 13) {
		addItem();
	}
}

