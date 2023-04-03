//zev counting
const elements = document.querySelectorAll('.count_1, .count_2, .count_3');
elements.forEach(function (element) {
	element.Counter = 0;
	const target = parseInt(element.innerText);
	const increment = target / 80;
	let count = 0;

	const timer = setInterval(function () {
		count += increment;
		element.innerText = Math.ceil(count);

		if (count >= target) {
			clearInterval(timer);
			element.innerText = target;
		}
	}, 50);
});



const sliderElm = document.querySelector('.splide');
const SLIDE_SPEED = 400;
const slider = new Splide(sliderElm, {
	type: 'fade',
	rewind: true,
	speed: SLIDE_SPEED,
}).mount();
const modalButtons = document.querySelectorAll('.js-modal-buton');
modalButtons.forEach(modalButton => {
	modalButton.addEventListener('click', () => {
		sliderElm.dataset.showIndex = modalButton.dataset.index;
	});
});

MicroModal.init({
	onShow: () => {
		slider.options = {
			speed: 0
		};
		slider.go(Number(sliderElm.dataset.showIndex));
		slider.options = {
			speed: SLIDE_SPEED
		};
	}
});


//zev  animated text
class TxtRotate {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.isDeleting = false;
		this.tick();
	}

	tick() {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		const that = this;
		let delta = 300 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}

window.onload = function () {
	const elements = document.getElementsByClassName('txt-rotate');
	for (let i = 0; i < elements.length; i++) {
		const toRotate = elements[i].getAttribute('data-rotate');
		const period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}
	const css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
	document.body.appendChild(css);
};