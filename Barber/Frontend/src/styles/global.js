/* Arquivo com estilização global */

import { createGlobalStyle } from 'styled-components'; /* Biblioteca para gerenciar estilos */

import 'react-perfect-scrollbar/dist/css/styles.css';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`


    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        
    }

    *:focus {
        outline: 0;
    }

    html, body, #root {
        height: 100%
    }

    body {
        -webkit-font-smmothing: antialiased !important;
    }

    body, input, button {
        font: 14px 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    button {
        cursor: pointer;
    }



`;
