import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { StyledForm, StyledInput } from "../../styles/styledComponents/styledForm";
import { StyledButton } from "../../styles/styledComponents/styledButton";
import { Card } from "react-bootstrap";
import { registerFunction } from "../../api/auth/register.mjs";

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
  const [isVenueManager, setIsVenueManager] = useState(false);
  console.log(isVenueManager);
  const [formData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: isVenueManager,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerFunction(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mt-5">
      <Card.Body className="pt-5">
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
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
              <input
                type="checkbox"
                checked={isVenueManager}
                onChange={(event) => {
                  setIsVenueManager(event.target.checked);
                  console.log("isVenueManager:", isVenueManager);
                }}
              />
              I want to be a venue manager
            </label>
          </div>
          <StyledButton type="submit" className="mt-4">
            Sign Up
          </StyledButton>
        </StyledForm>
      </Card.Body>
    </Card>
  );
}

export default SignUpFormUser;
