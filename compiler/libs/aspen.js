var promptID = 1;
var aspen = {
	// Input/Output Routines
		// Print text with newlines
		print: function (text) {
			aspenConsole.innerText += "\n" + text + "\n";
		},
		// Print text without newlines
		note: function (text) {
			aspenConsole.innerText += text;
		},		
		// Warn users
		warn: function (text) {
			aspenConsole.innerHTML += "<p style='color: gold;'>" + text + "</p><br/>";
		},
		// Warn users
		log: function (text) {
			console.log(text);
		},
		// Scan inputted text as a text input
		take: function (text, placeholder = "") {
			aspenConsole.innerHTML += "<input type='text' placeholder='" + placeholder + "' id='prompt" + promptID + "' class='userinput' /><input type='submit' onclick='aspen.info();'/>";
			promptID += 1;
			return placeholder;
		},
		// Return inputted text
		info: function (id) {
			var mostRecentInput = document.getElementById('prompt' + (promptID - 1));
			return mostRecentInput.value;
		},
	// Basic Functions
		// Sleep for a specified amount of seconds
		sleep: function (time) {
			return new Promise(resolve => setTimeout(resolve, time * 1000));
		},
		// Get the current time and continuously append it
		time: function () {
			setInterval(function() {
				aspenConsole.innerText += new Date().toLocaleTimeString() + "\n";
			}, 1000);
		},
		// Get the time at the instant the routine is run
		instant: function () {
			aspenConsole.innerText += new Date().toLocaleTimeString() + "\n";
		},
	
	// Console Routines
		// Change console text colour
		color: function (colour) {
			aspenConsole.style.color = colour;
			return colour;
		},
		// Change console background colour
		bgcolor: function (colour) {
			aspenConsole.style.backgroundColor = colour;
			return colour;
		},
		// Clear the console
		clear: function () {
			aspenConsole.innerText = "";
		}
}
