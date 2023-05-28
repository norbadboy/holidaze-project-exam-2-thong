import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import { MdMail } from "react-icons/md";
import { FaFacebookSquare, FaApple, FaGoogle } from "react-icons/fa";
import { StyledForm, StyledInput } from "../../styles/styledComponents/styledForm";
import { StyledButton, BaseButton } from "../../styles/styledComponents/styledButton";
import { ErrorMessage } from "../../styles/styledComponents/errorMessage";
import { registerFunction } from "../../api/auth/register.mjs";
import { loginFunction } from "../../api/auth/login.mjs";
import styles from "../../styles/register.module.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[\w_]+$/, "only underscore (_) symbol allowed")
    .required(),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@(?:stud\.)?noroff\.no$/, "only valid email with @(stud.)noroff.no")
    .required(),
  password: yup.string().min(8, "minimum 8 characters").required(),
  avatar: yup.string().url("must be a valid URL"),
  venueManager: yup.boolean(),
});

function SignUpForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // only for testing. remove later
  const defaultValues = {
    name: "thong98",
    email: "thong98@noroff.no",
    password: "12345678",
    avatar: "https://placekitten.com/g/200/300",
    venueManager: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // check if profile already exists
      const existingProfile = await loginFunction(data);

      if (existingProfile) {
        setErrorMessage("Profile already exists");
        return;
      }

      // if profile does not exist, create new profile
      const response = await registerFunction(data);
      console.log(response);

      const loginResponse = await loginFunction(data);

      if (loginResponse.venueManager) {
        navigate("/manager");
      } else {
        navigate("/user");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later");
      console.error(error);
    }
  };

  return (
    <Card className={styles.signUp_Container}>
      <Card.Body className={styles.signUp_Body}>
        <Row className={styles.signUpRow_Container}>
          <Col lg={6}>
            <StyledForm className="d-flex flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <h1 className="mb-4">Sign up</h1>
              </div>
              <StyledInput
                className={styles.signUp_Input}
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <StyledInput
                className={styles.signUp_Input}
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <StyledInput
                className={styles.signUp_Input}
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <StyledInput
                className={styles.signUp_Input}
                type="text"
                placeholder="Avatar URL"
                {...register("avatar", { required: false })}
              />
              {errors.avatar && <p>{errors.avatar.message}</p>}
              <div>
                <label>
                  <input className="me-2" type="checkbox" {...register("venueManager")} />I want to
                  be a venue manager
                </label>
              </div>
              <StyledButton type="submit" className="mt-4">
                Sign Up
              </StyledButton>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </StyledForm>
          </Col>
          <Col lg={6}>
            <div className={styles.haveAccount_Container}>
              <div className="d-flex flex-column">
                <h4 className={styles.haveAccount_Title}>Already have an account?</h4>
                <h4 className={styles.haveAccount_Title_Mobile}>Or log in</h4>
                <div className="mt-1">
                  <Link to="/login" className={styles.redirectToLogin_Link}>
                    <div className={styles.redirect_ButtonContainer}>
                      <BaseButton className={styles.redirectToLogin_Button}>
                        <div className={styles.redirectToLogin_IconContainer}>
                          <MdMail className={styles.redirectToLogin_Icon} />
                        </div>
                        <div className={styles.redirectToLogin_Text}>Continue with E-mail</div>
                      </BaseButton>
                    </div>
                  </Link>
                  <div className={styles.redirect_ButtonContainer}>
                    <Button
                      className={styles.redirect_Button}
                      variant="outline-primary"
                      size="md"
                      onClick={() => window.open("https://www.facebook.com", "_blank")}
                    >
                      <div className={styles.redirect_IconContainer}>
                        <FaFacebookSquare className={styles.redirect_Icon} />
                      </div>
                      <div className={styles.redirect_Text}>Continue with Facebook</div>
                    </Button>
                  </div>
                  <div className={styles.redirect_ButtonContainer}>
                    <Button
                      className={styles.redirect_Button}
                      variant="outline-danger"
                      size="md"
                      onClick={() => window.open("https://www.google.com", "_blank")}
                    >
                      <div className={styles.redirect_IconContainer}>
                        <FaGoogle className={styles.redirect_Icon} />
                      </div>
                      <div className={styles.redirect_Text}>Continue with Google</div>{" "}
                    </Button>
                  </div>
                  <div className={styles.redirect_ButtonContainer}>
                    <Button
                      className={styles.redirect_Button}
                      variant="outline-dark"
                      size="md"
                      onClick={() => window.open("https://www.apple.com", "_blank")}
                    >
                      <div className={styles.redirect_IconContainer}>
                        <FaApple className={styles.redirect_Icon} />
                      </div>
                      <div className={styles.redirect_Text}>Continue with Apple</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SignUpForm;
