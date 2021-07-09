function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
//BURGER===========================================================================================================================================

let iconMenu = document.querySelector('.icon-menu'), bodyMenu = document.querySelector('.menu__body');

function burgerMenu() {
	iconMenu.classList.toggle('_active');
	bodyMenu.classList.toggle('_active');
}

iconMenu.addEventListener('click', burgerMenu)

//LOGOS===========================================================================================================================================

let clientLogo = document.querySelectorAll('.clients__logo img');
let clientLogoLinks = document.querySelectorAll('.clients__logo');

function logoCheck(logos) {
	let i = 1;
	for (let image of clientLogo) {
		if (image.getAttribute('src') === '#') {
			image.classList.add('_hidden');
		}
	}
	for (let logo of logos) {

		if (logo.querySelector('img').classList.contains('_hidden')) {
			logo.append('LOGO CLIENT ' + i);
			i++;
		} else {
			i++;
		};

	}
}

logoCheck(clientLogoLinks);

//POPUP===========================================================================================================================================

let body = document.querySelector('body');
let shadow = document.querySelector('._shadow');
let footerButton = document.querySelector('.footer__button');
let popupForm = document.querySelector('.popup__form');
let closeButtons = document.querySelectorAll('.popup__close');
let popups = document.querySelectorAll('.popup');
let successPopup = document.querySelector('.popup__success');

function popupFormAppearance(event) {
	event.preventDefault();
	popupForm.classList.toggle('_disabled');
	popupForm.classList.toggle('_opened');
	bodyLock();
}

function bodyLock() {
	body.classList.toggle('_lock');
	shadow.classList.toggle('_disabled');
	document.addEventListener('keydown', escapeClosePopup);

	document.addEventListener('click', externalClosePopup);
}

function popupeClose() {
	for (let popup of popups) {
		popup.classList.add('_disabled');
		popup.classList.remove('_opened');
	}
	bodyLock();
	document.removeEventListener('keydown', escapeClosePopup);
	document.removeEventListener('click', externalClosePopup);
}

function escapeClosePopup(event) {
	if (event.code === 'Escape') {
		popupeClose();
	}
}

function externalClosePopup(event) {
	const target = event.target
	if (!target.closest('.popup') && !target.closest('.footer__button')) {
		popupeClose();
	}
}

footerButton.addEventListener('click', popupFormAppearance);

for (let closeButton of closeButtons) {
	closeButton.addEventListener('click', popupeClose);
}



//FORM===========================================================================================================================================
let forms = document.querySelectorAll('#contact-form');
let inputPlaceholder = document.querySelectorAll('._placeholder');

function placeholderRemove() {
	if (this.value === this.dataset.placeholder) {
		this.value = '';
	}
	this.classList.add('_fill');
}

function placeholderAppend() {
	if (this.value === '') {
		this.value = this.dataset.placeholder;
		this.classList.remove('_fill')
	}
}

for (let input of inputPlaceholder) {
	input.value = input.dataset.placeholder;
	input.addEventListener('focus', placeholderRemove)
	input.addEventListener('blur', placeholderAppend)
}

for (let form of forms) {
	let inputs = form.querySelectorAll('.form__input');
	let submitButton = form.querySelector('.form__submit');
	let errors = 0;

	function addError(elem, type) {
		let errorMessage = document.createElement('p');
		let errorText = {
			email: 'Please fill in the email correctly - example@icloud.com',
			text: 'Please, fill in this field',
		}
		errorMessage.classList.add('_error-message');
		errorMessage.append(errorText[type]);
		elem.parentElement.classList.add('_error');
		elem.parentElement.insertAdjacentElement('beforeEnd', errorMessage);
	}

	function removeError(elem) {
		let errorMessage = elem.parentElement.querySelector('._error-message');
		errorMessage.parentElement.removeChild(errorMessage);
		elem.parentElement.classList.remove('_error');
		errors--;
	}

	function inputFillCheck(elem) {
		if (elem.value !== '' && elem.value !== elem.dataset.placeholder) {
			return true;
		} else {
			return false;
		}
	}

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email.value).toLowerCase());
	}

	function validationForm() {
		let type;
		for (let input of inputs) {
			if (!inputFillCheck(input)) {
				type = 'text';
				addError(input, type);
				errors++;
			} else if (input.classList.contains('_email')) {
				if (!validateEmail(input)) {
					type = 'email';
					addError(input, type);
					errors++
				}
			}
		}
	}

	function inputRemoveError() {
		if (this.parentElement.classList.contains('_error')) {
			removeError(this);
		}
	}

	function submitButtonReactivation() {
		if (errors === 0) {
			submitButton.removeAttribute('disabled');
		}
	}

	for (let input of inputs) {
		input.addEventListener('focus', inputRemoveError);
		input.addEventListener('blur', submitButtonReactivation)
		input.addEventListener('mouseout', submitButtonReactivation)
	}

	async function formSend(event) {
		event.preventDefault();
		validationForm();
		let formData = new FormData(form);
		if (errors !== 0) {
			submitButton.setAttribute('disabled', true);
		} else {
			let response = await fetch('sendform.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				popupForm.classList.add('_disabled');
				successPopup.classList.remove('_disabled');
				bodyLock();
				form.reset();
			} else {
				let result = await response.json();
				alert(result.message);
			}
		}
	}

	form.addEventListener('submit', formSend);
}
