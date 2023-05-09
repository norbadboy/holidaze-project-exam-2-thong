import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledButton } from "../../styles/styledComponents/styledButton";
import { Card } from "react-bootstrap";
import { loginFunction } from "../../api/auth/login.mjs";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/login.module.css";

const Login = () => {
  const navigate = useNavigate();

  // only for testing. remove later
  /**
   * Initial values for formik
   * @param {string} email
   * @param {string} password
   */
  const initialValues = {
    email: "thong98@noroff.no",
    password: "12345678",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@(?:stud\.)?noroff\.no$/,
        "only valid email with @(stud.)noroff.no"
      )
      .required(),
    password: yup.string().min(8, "minimum 8 characters").required(),
  });
  /**
   * Function to handle login
   * @param {object} data
   * @param {object} setErrors
   * @returns navigate to manager or user page
   * @returns set error if invalid email or password
   */
  const onSubmit = async (data, { setErrors }) => {
    try {
      const response = await loginFunction(data);

      if (response.venueManager) {
        navigate("/manager");
      } else {
        navigate("/user");
      }
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
    }
  };

  return (
    <Card className={`${styles.loginBody} p-5 d-flex`}>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-center">
            <h1>Login</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="d-flex flex-column justify-content-center align-items-center">
                <div className="my-4">
                  <div className="d-flex flex-column">
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div
                          style={{
                            color: "red",
                            fontSize: "0.8rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                    <label htmlFor="email"></label>
                    <Field type="email" name="email" className={styles.loginFieldText} />
                  </div>
                  <div>
                    <ErrorMessage name="password" />
                    <label htmlFor="password"></label>
                    <Field type="password" name="password" className={styles.loginFieldText} />
                  </div>
                </div>
                <StyledButton type="submit" disabled={isSubmitting}>
                  Log in
                </StyledButton>
              </Form>
            )}
          </Formik>
        </div>
        <div className="redirectToRegister flex-grow-0 d-flex flex-column align-items-center justify-content-center">
          <h5>Don't have an account?</h5>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </Card>
  );
};

export default Login;
