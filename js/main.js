$(document).ready(function() {
	$("#setup-textarea").hide();
	$("#setup-grid").hide();
	$("#board").hide();

	$("#chooseTextArea").click(function() {
		$("#choose").hide();
		$("#setup-textarea").show();
	});
	$("#chooseGrid").click(function() {
		$("#choose").hide();
		$("#setup-grid").show();
	});
	$(".goback").click(function () {
		$("#choose").show();
		$("#setup-textarea").hide();
		$("#setup-grid").hide();
	});
	$("#setup-return").click(function() {
		$("#board").hide();
		$("#setup").show();
	});

	$(".final").click(function() {
		$(this).toggleClass("done");
	});

	$("#textarea-create-free").click(function() {
		var data = $("#textarea-data").val().split("\n");
		if (data.length < 24) {
			var missing = 24 - data.length;
			for (var i = 0; i < missing; i++) {
				data.push("FREE");
			}
		}
		var fin_data = [];
		for (var i = 0; i < 25; i++) {
			var datum = "";
			if (i != 12) {
				var rand = Math.floor(Math.random() * data.length);
				datum = data[rand];
				if (datum == "") {
					datum = "FREE";
				}
				fin_data.push(datum);
				data.splice(rand, 1);
			}
			else {
				datum = "FREE";
				fin_data.push("FREE");
			}
			$("#board" + i).text(datum);
		}
		$("#setup").hide();
		$("#board").show();
	});
	$("#textarea-create-nofree").click(function() {
		var data = $("#textarea-data").val().split("\n");
		if (data.length < 25) {
			var missing = 25 - data.length;
			for (var i = 0; i < missing; i++) {
				data.push("FREE");
			}
		}
		var fin_data = [];
		for (var i = 0; i < 25; i++) {
			var rand = Math.floor(Math.random() * data.length);
			var datum = data[rand];
			if (datum == "") {
				datum = "FREE";
			}
			fin_data.push(datum);
			data.splice(rand, 1);
			$("#board" + i).text(datum);
		}
		$("#setup").hide();
		$("#board").show();
	});
	$("#grid-create").click(function() {
		for (var i = 0; i < 25; i++) {
			var datum = $("#setup" + i).val();
			if (datum == "") {
				datum = "FREE";
			}
			$("#board" + i).text(datum);
		}
		$("#setup").hide();
		$("#board").show();
	});
});