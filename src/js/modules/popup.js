export class Popup {
	constructor() {
		this.activePopup = null;
		this.init();
	}

	init() {
		document.addEventListener('click', (e) => this.handleClick(e));
		document.addEventListener('keydown', (e) => this.handleKeydown(e));
	}

	handleClick(e) {
		const target = e.target;

		if (target.closest('[data-modal]')) {
			e.preventDefault();
			this.openPopup(target.closest('[data-modal]'));
		}

		if (target.closest('[data-close-modal]')) {
			e.preventDefault();
			this.closePopup(target.closest('.popup'));
		}

		if (target.classList.contains('popup')) {
			this.closePopup(target);
		}
	}

	handleKeydown(e) {
		if (!this.activePopup) return;

		if (e.key === "Escape") {
			this.closePopup(this.activePopup);
		}

		if (e.key === "Enter") {
			e.preventDefault();
		}
	}

	openPopup(trigger) {
		const popupName = trigger.getAttribute('data-href') || trigger.getAttribute('href')?.replace("#", "");
		if (popupName && /\.(jpg|jpeg|png|gif|webp)$/i.test(popupName)) {
			this.openImagePopup(popupName);
		} else {
			this.openPopupById(popupName, trigger);
		}
	}

	openPopupById(popupId, trigger = null) {
		const modal = document.getElementById(popupId);
		if (!modal) return;

		if (this.activePopup) {
			this.closePopup(this.activePopup, false);
		} else {
			this.lockBody();
		}

		modal.classList.add('open');
		this.setAttributes(modal, { 'aria-hidden': 'false', 'tabindex': '-1' });
		if (trigger) {
			this.setAttributes(trigger, { 'aria-expanded': 'true', 'data-modal': 'open' });
		}

		this.activePopup = modal;
		modal.dispatchEvent(new CustomEvent('popupOpen', { detail: { modal, trigger } }));
	}

	openImagePopup(imageSrc) {
		let modal = document.getElementById('image-popup');

		if (!modal) {
			modal = document.createElement('div');
			modal.id = 'image-popup';
			modal.classList.add('popup');
			modal.innerHTML = `
				<button class="popup__close icon-close" data-close-modal></button>
				<div class="popup__picture">            
					<img src="" class="popup__image" alt="Изображение">
				</div>
			`;
			document.body.appendChild(modal);
		}

		modal.querySelector('.popup__image').src = imageSrc;

		setTimeout(() => {
			this.openPopupById('image-popup');
		}, 0)
	}

	closePopup(modal, unlockBody = true) {
		if (!modal) return;

		modal.classList.remove('open');
		this.setAttributes(modal, { 'aria-hidden': 'true', 'tabindex': null });

		const trigger = document.querySelector('[data-modal="open"]');
		if (trigger) {
			this.setAttributes(trigger, { 'aria-expanded': 'false', 'data-modal': '' });
		}

		if (unlockBody) {
			this.unlockBody();
		}

		if (modal.id === 'image-popup') {
			setTimeout(() => modal.remove(), 300);
		}

		this.activePopup = null;
		modal.dispatchEvent(new CustomEvent('popupClose', { detail: { modal } }));
	}

	closePopupById(popupId) {
		const modal = document.getElementById(popupId);
		if (modal) {
			this.closePopup(modal);
		}
	}

	lockBody() {
		document.body.classList.add('locked');
	}

	unlockBody() {
		document.body.classList.remove('locked');
	}

	setAttributes(element, attributes) {
		Object.keys(attributes).forEach(key => {
			const value = attributes[key];
			if (value === null) {
				element.removeAttribute(key);
			} else {
				element.setAttribute(key, value);
			}
		});
	}
}