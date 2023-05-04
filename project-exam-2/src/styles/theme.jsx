import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    primary: "var(--color-primary)",
    primaryLight: "var(--color-primary-light)",
    primaryDark: "var(--color-primary-dark)",
    secondary: "var(--color-secondary)",
    secondaryLight: "var(--color-secondary-light)",
    secondaryDark: "var(--color-secondary-dark)",
    tertiary: "var(--color-tertiary)",
    tertiaryLight: "var(--color-tertiary-light)",
    tertiaryDark: "var(--color-tertiary-dark)",
    success: "var(--color-success)",
    successLight: "var(--color-success-light)",
    successDark: "var(--color-success-dark)",
    warning: "var(--color-warning)",
    warningLight: "var(--color-warning-light)",
    warningDark: "var(--color-warning-dark)",
    danger: "var(--color-danger)",
    dangerLight: "var(--color-danger-light)",
    dangerDark: "var(--color-danger-dark)",
    neutral0: "var(--color-neutral-0)",
  },
  background: {
    primary: "var(--color-background)",
  },
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
