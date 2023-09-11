export default class AlertManager {
    constructor(alertPlaceId, alertTemplateId) {
        this.alertPlace = document.getElementById(alertPlaceId);
        this.alertTemplate = document.getElementById(alertTemplateId);
        this.alertTemplateId = alertTemplateId
    }

    showAlert(text) {
        const clone = document.importNode(document.getElementById(this.alertTemplateId).content, true);
        const alert = clone.getElementById('alert');
        const alertText = clone.getElementById('alertText');
        alertText.textContent = text;

        alert.addEventListener('animationend', () => {
            setTimeout(() => {
                this.alertPlace.removeChild(alert);
            }, 3300);
        });
        
        alert.classList.add('show');
        this.alertPlace.appendChild(alert);

        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}