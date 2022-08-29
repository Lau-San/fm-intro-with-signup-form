const signUpForm = document.forms[0];

/**
 * Show a wawrning for the given element element
 * @param {*} elem The element that will have the warning
 * @param {*} text The warning text
 */
function showWarning(elem, text) {
	clearWarning(elem);

	// Apply styles
	elem.classList.add('invalid');

	// Create warning
	warningElem = document.createElement('p');
	warningElem.classList.add('warning');
	warningElem.innerText = text;

	// Add warning
	elem.after(warningElem);
}

/**
 * Remove any warning that the given element may have
 * @param {*} elem the element with the warning to remove
 */
function clearWarning(elem) {
	// Remove styles
	elem.classList.remove('invalid');

	// Remove warning text
	const warning = elem.nextElementSibling;
	if (warning.classList.contains('warning')) {
		warning.remove();
	}
}

/**
 * Check if the given email is valid. Return `true` if the email is valid,
 * `false` otherwise. A valid email has the form `name@host.tld`
 * @param {*} email The email string to check
 * @returns `true` if the email has the correct form. `false` otherwise.
 */
function isValidEmail(email) {
	const regex = RegExp('.+@.+\\..+');
	return regex.test(email);
}

/**
 * Check if the given input has valid information. The input is valid if its value is not empty and in the case of email, it should also be a valid email.
 * @param {*} input The input element to validate
 * @returns A list where the first element is a boolean (`true` if the input is valid, `false` otherwise) and a string with a message describing the validation error (if the input is valid this is `undefined`).
 */
function validateInput(input) {
	let isValid = true;
	let warning;

	// Check if the field is empty
	if (!input.value) {
		isValid = false;
		warning = `${input.name} cannot be empty`;
		return [isValid, warning];
	}

	// If field is an email, check if it's a valid email
	if (input.name == 'Email' && !isValidEmail(input.value)) {
		isValid = false;
		warning = 'Looks like this is not an email';
	}

	return [isValid, warning];
}

signUpForm.addEventListener('submit', e => {
	const fieldInputs = signUpForm.elements;

	let isFormValid = true;

	// Check if the field is now valid after changing its value
	const recheckField = e => {
		clearWarning(e.target.parentElement);
		e.target.removeEventListener('change', recheckField);
	};

	for (let input of fieldInputs) {
		if (input.type == 'submit') break;

		const [isInputValid, warning] = validateInput(input);

		if (isInputValid) continue;

		isFormValid = false;

		// Show a warning
		const parent = input.parentElement;
		showWarning(parent, warning);

		input.addEventListener('change', recheckField);
	}

	if (!isFormValid) e.preventDefault();
});
