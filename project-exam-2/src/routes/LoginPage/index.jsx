import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { StyledButton } from "../../styles/styledComponents/styledButton";
import { Card } from "react-bootstrap";
import { loginFunction } from "../../api/auth/login.mjs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // only for testing. remove later
  const initialValues = {
    email: "thong99@noroff.no",
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
  const onSubmit = async (data) => {
    try {
      const response = await loginFunction(data);
      console.log(response);

      if (response.venueManager) {
        navigate("/manager");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mt-5">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="mt-5">
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" />
            </div>
            <StyledButton type="submit" disabled={isSubmitting}>
              Login
            </StyledButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
