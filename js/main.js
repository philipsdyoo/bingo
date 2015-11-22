var airhorns = new Audio('./sounds/airhorns.mp3');
var yay = new Audio('./sounds/yay.mp3');

$(document).ready(function() {
	$("#setup-textarea").hide();
	$("#setup-grid").hide();
	$("#board").hide();
	$("#call-bingo").hide();

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
		var result = boardComplete();
		if (result) {
			$("#call-bingo").show();
			$("#setup-return").hide();
		}
		else {
			$("#call-bingo").hide();
			$("#setup-return").show();
		}
	});
	$("#call-bingo").mouseup(function() {
		airhorns.play();
		setTimeout(function() {
			yay.play();
		}, 1000);
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
		$(".final").removeClass("done");
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
		$(".final").removeClass("done");
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
		$(".final").removeClass("done");
	});
	$("#textarea-data").keyup(function() {
		var data = $("#textarea-data").val().split("\n");
		var num = data.length;
		for (var i = 0; i < data.length; i++) {
			if (data[i] == "") {
				num--;
			}
		}
		$("#counter").text("# of items: " + num);
	});
});

function boardComplete() {
	var board = [
		[$("#board0").hasClass("done"), $("#board1").hasClass("done"), $("#board2").hasClass("done"), $("#board3").hasClass("done"), $("#board4").hasClass("done")],
		[$("#board5").hasClass("done"), $("#board6").hasClass("done"), $("#board7").hasClass("done"), $("#board8").hasClass("done"), $("#board9").hasClass("done")],
		[$("#board10").hasClass("done"), $("#board11").hasClass("done"), $("#board12").hasClass("done"), $("#board13").hasClass("done"), $("#board14").hasClass("done")],
		[$("#board15").hasClass("done"), $("#board16").hasClass("done"), $("#board17").hasClass("done"), $("#board18").hasClass("done"), $("#board19").hasClass("done")],
		[$("#board20").hasClass("done"), $("#board21").hasClass("done"), $("#board22").hasClass("done"), $("#board23").hasClass("done"), $("#board24").hasClass("done")]
	];
	var row1 = board[0][0] && board[0][1] && board[0][2] && board[0][3] && board[0][4];
	var row2 = board[1][0] && board[1][1] && board[1][2] && board[1][3] && board[1][4];
	var row3 = board[2][0] && board[2][1] && board[2][2] && board[2][3] && board[2][4];
	var row4 = board[3][0] && board[3][1] && board[3][2] && board[3][3] && board[3][4];
	var row5 = board[4][0] && board[4][1] && board[4][2] && board[4][3] && board[4][4];

	var col1 = board[0][0] && board[1][0] && board[2][0] && board[3][0] && board[4][0];
	var col2 = board[0][1] && board[1][1] && board[2][1] && board[3][1] && board[4][1];
	var col3 = board[0][2] && board[1][2] && board[2][2] && board[3][2] && board[4][2];
	var col4 = board[0][3] && board[1][3] && board[2][3] && board[3][3] && board[4][3];
	var col5 = board[0][4] && board[1][4] && board[2][4] && board[3][4] && board[4][4];

	var diag1 = board[0][0] && board[1][1] && board[2][2] && board[3][3] && board[4][4];
	var diag2 = board[0][4] && board[1][3] && board[2][2] && board[3][1] && board[4][0];

	var result = row1 || row2 || row3 || row4 || row5 || col1 || col2 || col3 || col4 || col5 || diag1 || diag2;
	
	return result;
}