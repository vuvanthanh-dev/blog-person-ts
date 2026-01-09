import { type FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseFormComponent from "@/core/components/base-form";
import Avatar from "@/assets/avatar.jpg";
import BackgroundLogin from "@/assets/background-login.jpg";
import type { AppDispatch, RootState } from "@/app/config-store/store";
import { TokenService } from "@/core/interceptor/token.service";
import { loginConfig, initialValues } from "./config";
import type { Login } from "../../types";
import { loginUser } from "../../slice.auth";
import styles from "./_login.module.scss";
import ROUTES_PATH from "@/core/routes";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formValues, setFormValues] = useState<Login>(initialValues);

  useEffect(() => {
    document.title = "Đăng nhập";
    if (Boolean(TokenService.getAccessToken()) && isAuthenticated) {
      navigate(ROUTES_PATH.home.index, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onChange = (data: Record<string, any>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  const handleSubmit = async (data: Login) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={styles["login-container"]}>
      <img src={BackgroundLogin} alt="login" />
      <div className={styles["form-login"]}>
        <img className={styles["form-login__image"]} src={Avatar} alt="login" />
        <label className={styles["form-login__title"]}>
          Login Personal Blog
        </label>
        <BaseFormComponent
          formConfig={loginConfig}
          values={formValues}
          onChange={onChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginPage;
