const appendChar = num => {

	// Add value to screen
	let new_value = $('#screen').val() + num;

	$('#screen').val(new_value);

}

const zeroHandler = () => {

	let value = $('#screen').val();

	// If 0 is the only character on screen, do nothing
	if(value.length == 1 && value.includes('0')) return 0;

	// If screen is empty, do nothing
	else if(value == '0') return 0;

	else appendChar("0");

}

const dotHandler = () => {
	let value = $('#screen').val();

	// If screen is empty, add "0."
	if(value == '') appendChar("0.");

	// If screen ends with ".", do nothing
	else if(value.endsWith('.')) return 0;

	// If screen ends with any operator, add "0."
	else if(value.endsWith("+") || value.endsWith("÷") || value.endsWith("×") || value.endsWith("−")) appendChar("0.");
	
	else{
		let signs = ["÷", "+", "×", "−"];
		for(sign of signs){
			let splits = value.split(sign);
			let last_split = splits[splits.length - 1];

			if(last_split.includes('+') == false && last_split.includes("÷") == false && last_split.includes("×") == false && last_split.includes("−") == false && last_split.includes('.') == false) return appendChar('.');
		}
	}
}

const signHandler = sign => {
	let value = $('#screen').val();

	// If screen is empty, add "0" followed by the sign clicked
	if(value == '') appendChar(`0${sign}`);

	// If screen ends with any operator, do nothing
	else if(value.endsWith("+") || value.endsWith("÷") || value.endsWith("×") || value.endsWith("−")) return 0;
	
	else appendChar(sign);
}

const clearHandler = () => {
	let value = $('#screen').val();
	if(value == '') return 0;
	$('#screen').css('transform', 'rotateX(180deg)');
	setTimeout( () => {
		$('#screen').css('font-size', '45px')
		$("#screen").val('');
		setTimeout( () => $('#screen').css('transform', 'rotateX(0deg)') , 100);
	}, 100);
}


const backspaceHandler = () => {
	let value = $('#screen').val();
	// new_value = value - last_character
	let new_value = value.substr(0, value.length - 1);
	$('#screen').val(new_value);
}

const evalHandler = () => {
	let value = $('#screen').val();

	// Replace foreign operator signs with native signs
	let temp = value.split("−").join("-").split("÷").join("/").split("×").join("*");
	
	// Evaluate expression
	let new_value = eval(temp);

	$('#screen').val(new_value);
}

$('.key').click(function(){
	let insider  = $(this).html();

	switch(insider){
		case "0":
			zeroHandler();
			break;
		case ".":
			dotHandler();
			break;
		case "CLS":
			clearHandler();
			break;
		case "⌫":
			backspaceHandler();
			break;
		case "+":
			signHandler(insider);
			break;
		case "×":
			signHandler(insider);
			break;
		case "÷":
			signHandler(insider);
			break;
		case "−":
			signHandler(insider);
			break;
		case "=":
			evalHandler();
			break;
		default:
			appendChar(insider);
			break;
	}

	$(this).css('background', '#007bffaa');
	setTimeout(() => $(this).css('background', '#007bff'), 100);

	let length = $('#screen').val().length;
	if(length < 10) $('#screen').css('font-size', '45px');
	else if(length >= 10 && length < 13) $('#screen').css('font-size', '40px');
	else if(length >= 13 && length < 16) $('#screen').css('font-size', '35px');
	else if(length >= 16 && length < 19) $('#screen').css('font-size', '30px');
	else if(length >= 19 && length <= 22) $('#screen').css('font-size', '25px');
	else console.log('Screen is full');
});