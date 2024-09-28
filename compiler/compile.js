var calcResult;
var aspenConsole = document.getElementById("aspenConsole");
var variableStore = {};

function clearConsole() {
	aspenConsole.innerText = "";
}

function doCmd() {
	// Get the command block content
	var commandBlockText = document.getElementById("commandBlock").innerText;
	// Split commands by semicolons
	var commands = commandBlockText.split(/[\n;]+/);
	
	// Process each command
	for (var i = 0; i < commands.length; i++) {
		var command = commands[i].trim();
		if (command.length > 0) {
		    checkLabLang(command);  // Interpret each command
		}
	}
}

function checkLabLang(commandEntered) {
	// Variables
	if (commandEntered.startsWith("$")) {
		var assignment = commandEntered.substring(1).split("=");
		var varName = assignment[0].trim();
		var varValue = assignment[1].trim();		
		variableStore[varName] = eval(varValue);
	}
	
	// Print routine
	else if (commandEntered.startsWith("print(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.print(evaluatedExpression);
	}
	
	// Note routine
	else if (commandEntered.startsWith("note(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.note(evaluatedExpression);
	}

	// Warn routine, which for now prints text in yellow, but will eventually just make a log file of errors
	else if (commandEntered.startsWith("warn(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(5, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.warn(evaluatedExpression);
	}

	// Sleep routine, pause execution for expression number of seconds
	else if (commandEntered.startsWith("sleep(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.sleep(evaluatedExpression);
	}

	// Time routine, continuously print time
	else if (commandEntered == "time()") {
		aspen.time();
	}

	// Instant routine, note the time at the current instant
	else if (commandEntered == "instant()") {
		aspen.instant();
	}

	// Color routine, change color of text in the console to any HEX color
	else if (commandEntered.startsWith("color(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.color(evaluatedExpression);
	}

	// Bgcolor routine, change background color of text in the console to any HEX color
	else if (commandEntered.startsWith("bgcolor(") && commandEntered.endsWith(")")) {
		var expression = commandEntered.substring(6, commandEntered.length - 1).trim();
		var evaluatedExpression = evalExpression(expression);
		aspen.bgcolor(evaluatedExpression);
	}

	// Clear routine, clear the entire console
	else if (commandEntered == "clear()") {
		aspen.clear();
	}
		
	// Comments
	else if (commandEntered.startsWith("#")) {
		// Do nothing (comments are ignored)
	}
	
	// Handle other unrecognized commands
	else {
		errorVoid("(void)ERR: Command not recognized; at (main):1:1");
	}
}

function evalExpression(expression) {
	// Replace variables with their values from variableStore, if they exist
	return eval(expression.replace(/\b\w+\b/g, function(match) {
		// If it's a variable in variableStore, replace it with the stored value
		return variableStore.hasOwnProperty(match) ? `variableStore['${match}']` : match;
	}));
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML = "";
}
