// ==UserScript==
// @name         Autenticação para o Made
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sim.tins.com.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tins.com.br
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        const time = setInterval(() => {
        const pathname = window.location.pathname;
        const pathnameNumbers = pathname.replace(/\D/gim, '');
        const pathnameFormated = pathname.replace(`${pathnameNumbers}/`, '');

        if (pathnameFormated == "/ti/contratos/" || pathnameFormated == "/ti/dashboard/") addUrl();
        else console.warn('Page:', 'Pagina não nescessaria!')
    }, 500);

    function addUrl() {
        const usersName = document.querySelectorAll('[title="Nome de Usuário"]');

        if(usersName.length > 0) {
            clearInterval(time);
            const timeBtnRoload = setInterval(() => {
                const reloadBtn = document.querySelectorAll('button[data-grid-ref="#grid_usuarios"][class="btn btn-success btn-trans"]')

                if(reloadBtn) {
                    reloadBtn.forEach(e => {
                        e.addEventListener('click', () => setTimeout(addUrl, 500));
                    });

                    return clearInterval(timeBtnRoload);
                }
            },500);
            usersName.forEach(e => {
                const value = e.children[0].innerText;

                e.innerHTML = `<a target="_blank" href="https://mgrconn.siminternet.com.br/dash_cliente.php?item=${value}">${value}</a>`;
            });
        }
        console.warn("Users Name:", "Não encontrado!")
    }

})();
