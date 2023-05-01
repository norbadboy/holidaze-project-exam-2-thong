import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { StyledForm, StyledInput, StyledParagraph } from "../../styles/styledComponents/styledForm";
import { Card } from "react-bootstrap";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup
      .string()
      .min(8, "Value must be at least 8 characters")
      .required("Please enter your password"),
    avatar: yup.string().url("Please enter a valid URL").required("Please enter your avatar URL"),
  })
  .required();

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Card className="mt-5">
      <Card.Body className="mt-5">
        <div>
          <h1 align="center" className="mt-4">
            Register
          </h1>
        </div>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            {errors.fullName && <StyledParagraph>{errors.fullName.message}</StyledParagraph>}
            <StyledInput type="text" placeholder="Full Name" {...register("fullName")} />
          </div>
          <div>
            {errors.email && <StyledParagraph>{errors.email.message}</StyledParagraph>}
            <StyledInput type="text" placeholder="Email" {...register("email")} />
          </div>
          <div>
            {errors.password && <StyledParagraph>{errors.password.message}</StyledParagraph>}
            <StyledInput type="text" placeholder="Password" {...register("password")} />
          </div>
          <StyledInput type="submit" />
        </StyledForm>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;
