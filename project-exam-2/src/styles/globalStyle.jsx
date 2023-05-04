import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --color-primary: #D31775;
    --color-primary-light: #FF66BD;
    --color-primary-dark: #A70C59;
    --color-secondary: #f2bfbf;
    --color-secondary-light: #f7e6e6;
    --color-secondary-dark: #b98b8b;
    --color-success: #36b37e;
    --color-success-light: #79f2c0;
    --color-success-dark: #00875a;
    --color-warning: #ffab00;
    --color-warning-light: #ffd766;
    --color-warning-dark: #b26e00;
    --color-danger: #ff5630;
    --color-danger-light: #ff8f71;
    --color-danger-dark: #b21f00;
    --color-neutral-0: #ffffff;
    --color-background: #1e1e1e;
}
body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}
`;

export default GlobalStyle;
