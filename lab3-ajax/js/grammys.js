//https://floresthela.github.io/labs-web/lab3-ajax/
$.ajax({
	url : "data/grammys.json",
	type : "GET",
	dataType : "json",

	success: function(data) {
		let new_html = "";

		for(let i = 0; i < data.fields.length; i++){
			console.log(data.length);
			new_html += `
			<option value = "${data.fields[i].field_id -1 }">${data.fields[i].field}
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
	$.ajax({
		url: "data/grammys.json",
		type: "GET",
		dataType: "json",
		success: function(data){
			$("#category_types").on("change", function(event){
				let id = $(this).val();
				

				if(id !== "-1"){
					let selection = data.fields[id];
					let new_html = "";
					
					// field
					new_html += 
					`<h2>${selection.field}</h2>`;

					// desc
					if(selection.description){
						new_html += 
						`<p>${selection.description}</p>`;
					}

					// categories
					for(let i = 0; i < selection.categories.length; i++){
						new_html += 
						`
						<h3>${selection.categories[i].category_name}</h3>
						<ul>
						`;

						// nominees
						for(let j = 0; j < selection.categories[i].nominees.length; j++){
							
							//es el ganador
							if(selection.categories[i].winner_id == j) {
								new_html += 
								`
								<li><strong class="winner">${selection.categories[i].nominees[j].nominee}
								</strong>
								`;
							}
							else{
								new_html += 
								`
								<li><strong>${selection.categories[i].nominees[j].nominee}</strong>
								`;
							}
							new_html += 
							`
							<p>${selection.categories[i].nominees[j].artist}</p>
							<p>${selection.categories[i].nominees[j].info}</p>
							</li>
							`;
						}

						new_html += `</ul>`

					}

					$("#nominees_section").html(new_html);
				}

				else{
					$("#nominees_section").html("");
				}
			});

		},
		error: function(error_msg){
			console.log(error_msg);
		}
	});
}