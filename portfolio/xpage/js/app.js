;
const calendarButton = document.querySelector('.calendar__button');

if (calendarButton) {

	// Создание календаря ==============================================================================================================================

	const date = new Date();
	const dateInput = document.querySelector('#calendar__date');
	const calendarPlaceholder = document.querySelector('.calendar__selected-day');

	function createCalendar() {
		const monthDays = document.querySelector('.calendar__days');

		const month = document.querySelector('.calendar__month');

		const lastMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

		const lastPrevMonthDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

		const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;

		const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

		const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

		let days = [];

		let counter = 0;

		if (firstDayIndex === -1) {
			for (let k = 6; k > 0; k--) {
				days.push(`<li class='calendar__day calendar__day_prev'>${lastPrevMonthDay - k + 1}</li>`);
				counter++;
			}
		} else {
			for (let j = firstDayIndex; j > 0; j--) {
				days.push(`<li class='calendar__day calendar__day_prev'>${lastPrevMonthDay - j + 1}</li>`);
				counter++;
			}
		}

		for (let i = 1; i <= lastMonthDay; i++) {
			if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
				days.push(`<li class='calendar__day calendar__day_selected'>${i}</li>`);
			} else {
				days.push(`<li class='calendar__day'>${i}</li>`);
			}
		}

		for (let y = lastMonthDay + counter, x = 1; x <= 42 - y; x++) {
			days.push(`<li class='calendar__day calendar__day_next'>${x}</li>`);
		}

		if (date.getFullYear() !== new Date().getFullYear()) {
			month.innerHTML = months[date.getMonth()] + ', ' + date.getFullYear();
		} else {
			month.innerHTML = months[date.getMonth()]
		}
		monthDays.innerHTML = days.join('');
		dateInput.value = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		calendarPlaceholder.innerHTML = dateConverter(dateInput.value);
	};

	createCalendar();

	// Переключение месяцев ==============================================================================================================================

	const nextMonthButton = document.querySelector('.calendar__arrow_next');
	const prevMonthButton = document.querySelector('.calendar__arrow_prev');

	function nextMonth() {
		date.setMonth(date.getMonth() + 1);
		createCalendar();
		getDaysList();
	}

	function prevMonth() {
		date.setMonth(date.getMonth() - 1);
		createCalendar();
		getDaysList();
	}

	nextMonthButton.addEventListener('click', nextMonth);
	prevMonthButton.addEventListener('click', prevMonth);

	// Выбор даты ==============================================================================================================================

	const shownDays = document.getElementsByClassName('calendar__day');
	const calendarBody = document.querySelector('.calendar__body');

	function dateConverter(date) {
		let arr = date.split('-').reverse();
		let [day, month, year] = arr;
		let convertDate = [];
		if (day < 10) {
			convertDate.push('0' + day);
		} else {
			convertDate.push(day);
		}
		if (month < 10) {
			convertDate.push('0' + (Number(month) + 1))
		} else {
			convertDate.push(month);
		}
		convertDate.push(year);
		return convertDate.join('/');
	}

	function selectDate() {
		dateInput.value = date.getFullYear() + '-' + date.getMonth() + '-' + this.innerHTML;
		let prevDate = document.querySelector('.calendar__day_selected');
		if (prevDate) {
			prevDate.classList.remove('calendar__day_selected');
		}
		this.classList.add('calendar__day_selected');
		calendarPlaceholder.innerHTML = dateConverter(dateInput.value);
		calendarBody.classList.remove('_active');
	}

	function getDaysList() {
		for (let day of shownDays) {
			if (day.classList.contains('calendar__day_prev')) {
				day.addEventListener('click', prevMonth);
			} else if (day.classList.contains('calendar__day_next')) {
				day.addEventListener('click', nextMonth);
			} else {
				day.addEventListener('click', selectDate);
			}
		}
	}

	getDaysList();

	// Закрытие и открытие календаря ==============================================================================================================================

	function externalCloseCalendar(event) {
		const target = event.target
		if (!target.closest('.calendar__button') && !target.closest('.calendar__body')) {
			calendarBody.classList.remove('_active');
		}
	}

	function openCalendar(event) {
		event.preventDefault();
		calendarBody.classList.add('_active');
		document.addEventListener('click', externalCloseCalendar)
	}

	calendarButton.addEventListener('click', openCalendar)

};
const categoryButton = document.querySelector('.category__button');

if (categoryButton) {

	const categoryBody = document.querySelector('.category__body');
	const categories = document.querySelectorAll('.category__item');
	const catInput = document.querySelector('#category__select');

	function externalCloseCategory(event) {
		const target = event.target
		if (!target.closest('.category__button') && !target.closest('.category__body')) {
			categoryBody.classList.remove('_active');
			categoryButton.classList.remove('_active');
		}
	}

	function toggleCategory(event) {
		event.preventDefault();
		categoryBody.classList.toggle('_active');
		categoryButton.classList.toggle('_active');
		document.addEventListener('click', externalCloseCategory);
	}

	function selectCategory() {
		for (let category of categories) {
			if (category.classList.contains('category__item_active')) {
				category.classList.remove('category__item_active');
			}
		}
		this.classList.add('category__item_active');
		catInput.value = this.dataset.category;
		categoryBody.classList.toggle('_active');
		categoryButton.classList.toggle('_active');
	}

	categoryButton.addEventListener('click', toggleCategory);

	for (let category of categories) {
		category.addEventListener('click', selectCategory)
	}

};
//FORM===========================================================================================================================================
const form = document.querySelector('#comment-form');

if (form) {
	const inputPlaceholder = document.querySelectorAll('._placeholder');

	function placeholderRemove() {
		if (this.value === this.dataset.placeholder) {
			this.value = '';
		}
	}

	function placeholderAppend() {
		if (this.value === '') {
			this.value = this.dataset.placeholder;
		}
	}

	for (let input of inputPlaceholder) {
		input.value = input.dataset.placeholder;
		input.addEventListener('focus', placeholderRemove)
		input.addEventListener('blur', placeholderAppend)
	}
}

;