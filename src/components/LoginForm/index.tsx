import { useForm } from "react-hook-form";
import { ILogin } from "../../types/types";
import { api } from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [formError, SetFormError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onTouched",
  });
  const onSubmit = handleSubmit(async (data: ILogin) => {
    try {
      const res = await api.auth.login(data);
      localStorage.setItem("token", res.access_token);
      navigate("/shop");
    } catch (error) {
      SetFormError(true);
    }
  });

  return (
    <div className="form-wrapper container">
      <form onSubmit={onSubmit} className="login-form">
        <h1>Login</h1>
        <div className="input-wrap">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          <p className="errmsg">{errors?.email?.message}</p>
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <p className="errmsg">{errors?.password?.message}</p>
        </div>
        <button type="submit">Submit</button>
        {formError && (
          <p className="errmsg">
            Internal server error. Please try again later
          </p>
        )}
      </form>
    </div>
  );
};
