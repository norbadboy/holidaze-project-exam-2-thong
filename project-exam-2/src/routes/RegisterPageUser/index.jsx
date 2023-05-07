import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { StyledForm, StyledInput } from "../../styles/styledComponents/styledForm";
import { StyledButton } from "../../styles/styledComponents/styledButton";
import { Button, Card } from "react-bootstrap";
import { registerFunction } from "../../api/auth/register.mjs";
import { FaFacebookSquare, FaApple, FaGoogle } from "react-icons/fa";
import { MdMail } from "react-icons/md";

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

function SignUpFormUser() {
  const defaultValues = {
    name: "thong",
    email: "thong@noroff.no",
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
      const response = await registerFunction(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleContinueWithEmail = () => {
    window.location.href = "/login";
  };

  return (
    <Card className="mt-5">
      <Card.Body className="pt-5">
        <div className="d-flex justify-content-between">
          <StyledForm className="d-flex flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb-3">Sign up</h1>
            <StyledInput type="text" placeholder="Name" {...register("name", { required: true })} />
            {errors.name && <p>{errors.name.message}</p>}
            <StyledInput
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <StyledInput
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <StyledInput
              type="text"
              placeholder="Avatar URL"
              {...register("avatar", { required: false })}
            />
            {errors.avatar && <p>{errors.avatar.message}</p>}
            <div>
              <label>
                <input className="me-2" type="checkbox" {...register("venueManager")} />I want to be
                a venue manager
              </label>
            </div>
            <StyledButton type="submit" className="mt-4">
              Sign Up
            </StyledButton>
          </StyledForm>
          <div
            className="d-flex flex-grow-1 justify-content-center"
            style={{ borderLeft: "1px solid black" }}
          >
            <div className="redirectToLoginContainer d-flex flex-column">
              <h4 className="mt-4">Already have an account?</h4>
              <Button
                className="mt-3 d-flex justify-content-center"
                variant="outline-dark"
                size="md"
                onClick={handleContinueWithEmail}
              >
                <MdMail
                  className="mt-1 d-flex flex-grow-1"
                  style={{ width: "0px", height: "21px" }}
                />
                <div className="d-flex flex-grow-1" style={{ width: "210px" }}>
                  Continue with email
                </div>{" "}
              </Button>
              <Button
                className="mt-3 d-flex justify-content-center"
                variant="outline-primary"
                size="md"
                onClick={() => window.open("https://www.facebook.com", "_blank")}
              >
                <FaFacebookSquare className="mt-1 d-flex flex-grow-1" />
                <div className="d-flex flex-grow-1">Continue with Facebook</div>
              </Button>
              <Button
                className="mt-3 d-flex justify-content-center"
                variant="outline-danger"
                size="md"
                onClick={() => window.open("https://www.google.com", "_blank")}
              >
                <FaGoogle className="mt-1 d-flex flex-grow-1" style={{ width: "0px" }} />
                <div className="d-flex flex-grow-1" style={{ width: "200px" }}>
                  Continue with Google
                </div>{" "}
              </Button>
              <Button
                className="mt-3 d-flex justify-content-center"
                variant="outline-dark"
                size="md"
                onClick={() => window.open("https://www.apple.com", "_blank")}
              >
                <FaApple
                  className="mt-1 d-flex flex-grow-1"
                  style={{ width: "0px", height: "20px" }}
                />
                <div className="d-flex flex-grow-1" style={{ width: "200px" }}>
                  Continue with Apple
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SignUpFormUser;
