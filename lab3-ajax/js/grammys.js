/*tring jsonString = yourstring;
JSONObject jsonResult = new JSONObject(jsonString);
JSONArray data = jsonResult.getJSONArray("data");
if(data != null) {
    String[] names = new String[data.length()];
    String[] birthdays = new String[data.length()];
    for(int i = 0 ; i < data.length() ; i++) {
        birthdays[i] = data.getString("birthday");
        names[i] = data.getString("name");
    }
}*/

$.ajax({
	url : "data/grammys.json",
	type : "GET",
	dataType : "json",

	success: function(data) {
		let new_html = "";

		for(let i = 0; i < data.length; i++){
			console.log(data.length);
			new_html += `
			<option value = "${data[i].field_id}">${data[i].field}
			</option>
			`;
		}

		$("#category_types").append(new_html);
		loadInfo();

	},
	error: function(error_msg) {
		console.log(error_msg);
	}
});

function loadInfo() {
	var sec = document.getElementById("nominees_section");
	$.ajax({
		url: "data/grammys.json",
		type: "GET",
		dataType: "json",
		success: function(data){
			
			let new_html = "";
			$("#category_types").on('change', function(event) {
				
				let id = $(this).val();
				console.log(id);
				
				for(let i = 0; i < data.length; i++){
					if(id == data[i].field_id){
						console.log(data[i].field);
						new_html+= `<h1>${data[i].field}</h1>`;

					}


				}
			});
			//document.getElementById("parentID").innerHTML+= "new content"
			// sec.append(new_html); k pedo
		},

		
		
		error: function(error_msg){
			console.log(error_msg);
		}


	});
}