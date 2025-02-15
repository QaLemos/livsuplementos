document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("contact-modal");
    const closeModal = document.getElementById("closeModal");
    const form = document.getElementById("contact-form");
    const confirmationModal = document.getElementById("confirmation-modal");
    const okButton = document.getElementById("okButton");

    // Exibir modal automaticamente ao carregar a página
    modal.classList.add("show");

    // Fechar modal de contato ao clicar no botão "X"
    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Fechar modal de contato ao clicar fora dele
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Enviar o formulário, fechar o modal de contato e abrir o modal de confirmação
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio real do formulário

        // Obtém os dados do formulário
        const name = document.getElementById('name').value;
        const whatsapp = document.getElementById('whatsapp').value;

        // Envia os dados para o Google Sheets via Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbwM1LKQGAmflBQKQ8cxMwSMvU1OzSMnWXIr8hCO8ViKOw2wfdpVUYxFUwTdMBU2IpXn/exec', {
            method: 'POST',
            body: new URLSearchParams({
                name: name,
                whatsapp: whatsapp
            })
        })
            .then(response => response.text())
            .then(data => {
                console.log('Dados enviados com sucesso:', data);


            })
            .catch(error => {
                console.error('Erro ao enviar dados:', error);
            });
        // Fechar o modal de contato
        modal.classList.remove("show");

        // Exibir o modal de confirmação
        confirmationModal.classList.add("show");

        // Exibir confetes
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 }
        });
    });

    // Fechar o modal de confirmação ao clicar no botão "OK"
    okButton.addEventListener("click", function () {
        confirmationModal.classList.remove("show");
    });
});

