/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Checkbox, notification, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { encryptData } from "@/util/cryptoUtils";
import { login } from "@/api/authenApi";
import useAuth from "@/hooks/useAuth";
import { useDecryptCredentials } from "@/hooks/useDecryptCredentials";

function Authen() {
  const { t } = useTranslation("translation");
  const [values, setValues] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { username, password, secretKey } = useDecryptCredentials();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async (formValues) => {
    if (isLoggingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      const { usernameOrEmail, password } = formValues;
      const res = await login(usernameOrEmail, password);
      if (res && res.status === 200) {
        notification.success({
          message: t("Login Successful"),
          description: t("You have successfully logged in."),
          duration: 2,
        });
        const jwtToken = res.data.accessToken;
        Cookies.set("__token", jwtToken, { expires: 1 });
        if (rememberMe) {
          const encryptedUsername = encryptData(usernameOrEmail, secretKey);
          const encryptedPassword = encryptData(password, secretKey);
          Cookies.set("username", encryptedUsername);
          Cookies.set("password", encryptedPassword);
        }
        const authStore = useAuth.getState();
        authStore.login();
      }
    } catch (err) {
      notification.error({
        message: t("Login Failed"),
        description: t("Username or password is invalid. Please try again."),
        duration: 2,
      });
      console.error(">>> Error signing server", err);
      setIsLoggingIn(false);
    }
  };

  const onFinish = (values) => {
    setValues(values);
    if (values.usernameOrEmail && values.password) {
      handleSignin(values);
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="usernameOrEmail"
        rules={[
          {
            required: true,
            message: t("Please input your Username!"),
          },
          {
            min: 8,
            message: t("Username must be at least 8 characters"),
          },
        ]}
        initialValue={username}
        colon={true}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("Username")}
          autoFocus
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("Please input your Password!"),
          },
          {
            min: 8,
            message: t("Password must be at least 8 characters"),
          },
        ]}
        initialValue={password}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={showPassword ? "text" : "password"}
          placeholder={t("Password")}
          suffix={
            <>
              {showPassword ? (
                <EyeInvisibleOutlined onClick={togglePassword} />
              ) : (
                <EyeOutlined onClick={togglePassword} />
              )}
            </>
          }
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
            {t("Remember me")}
          </Checkbox>
          <Link
            to="#"
            className="login-form-forgot float-right text-[#3094ff] hover:underline"
          >
            {t("Forgot password")}
          </Link>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button bg-[#1677ff] block mx-auto w-full"
        >
          {isLoggingIn ? (
            <Spin indicator={<LoadingOutlined className="text-[#fff]" />} />
          ) : (
            t("Login")
          )}
        </Button>
        <p className="text-center mt-5">
          {t("Or")}{" "}
          <Link to="#" className="text-[#3094ff] hover:underline">
            {t("Register now")}
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
}

export default Authen;
