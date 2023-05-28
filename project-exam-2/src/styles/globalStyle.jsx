import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --color-primary: #D31775;
    --color-primary-light: #de54a2;
    --color-primary-dark: #A70C59;
    --color-secondary: #c07893;
    --color-secondary-light: #e5b5c782;
    --color-secondary-dark: #a9607b;
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
    --color-neutral-100: #f8f9fa;
    --color-neutral-200: #e9ecef;
    --color-neutral-300: #dee2e6;
    --color-neutral-400: #6C7684;
    --color-background: #1e1e1e;
    --color-background-footer: #f8f9fa;
}
body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", "Poppins", sans-serif;
}
`;

export default GlobalStyle;
