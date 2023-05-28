import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BaseButton, StyledButton } from "../../styles/styledComponents/styledButton";
import { Card, Row, Col } from "react-bootstrap";
import { loginFunction } from "../../api/auth/login.mjs";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/login.module.css";
import { useUser } from "../../contexts/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

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
      setUser(response);

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
    <Card className={styles.loginBody}>
      <Row>
        <Col lg={6}>
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
                  <div className={styles.signUpForm_Body}>
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
                      <ErrorMessage name="password">
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
        </Col>
        <Col lg={6} className={styles.redirectToRegister_Container}>
          <h4 className={styles.redirectToRegister_Title}>Don't have an account?</h4>
          <h5 className={styles.redirectToRegister_Title_Mobile}>Or register now!</h5>
          <Link to="/register">
            <BaseButton className={styles.redirectToRegister_Button}>Register</BaseButton>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default Login;
