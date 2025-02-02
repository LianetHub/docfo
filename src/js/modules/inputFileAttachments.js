export class FilePreview {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.form__file-input').forEach(input => {
            input.addEventListener('change', (event) => this.handleFileSelect(event));
        });
    }

    handleFileSelect(event) {
        const input = event.target;
        const label = input.closest('.form__file');
        if (!label) return;


        let previewContainer = label.closest('form').querySelector('.form__attachment');

        if (!previewContainer) {
            previewContainer = document.createElement('ul');
            previewContainer.classList.add('form__attachment');
            label.after(previewContainer);
        }


        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.addPreview(previewContainer, e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    addPreview(container, src) {
        const listItem = document.createElement('li');
        listItem.classList.add('form__attachment-item');

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'thumb';

        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('form__attachment-remove', 'icon-trash');
        removeButton.addEventListener('click', () => {
            listItem.remove();
        });

        listItem.appendChild(img);
        listItem.appendChild(removeButton);
        container.appendChild(listItem);
    }
}
