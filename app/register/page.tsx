

"use client";

import { useState } from 'react';
// import '@ant-design/v5-patch-for-react-19';
import { Form, Input, message, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { signUp } from "supertokens-web-js/recipe/emailpassword";
import Link from 'next/link';
import '../styles/style.scss'; 

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signUpClicked(values: { email: any; password: any; }) {
    const {email, password} = values;
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validation
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            window.alert(response.reason)
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/login"
        }
    } catch (err:any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}


  return (
    // <div className="gradient-bg">


    <div className="auth-page">
        <div className="auth-form">
          {/* <div className="registerHeader"> */}
          <h1>Register</h1>
          {/* </div> */}
          <Form layout="vertical" onFinish={signUpClicked}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters.' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
        </div>
        </div>



    // <div className="form-register">
    //   <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
    //     <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
    //     <Form layout="vertical" onFinish={signUpClicked}>
    //       <Form.Item
    //         label="Email"
    //         name="email"
    //         rules={[
    //           { required: true, message: 'Please input your email!' },
    //           { type: 'email', message: 'Please enter a valid email!' }
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>

    //       <Form.Item
    //         label="Password"
    //         name="password"
    //         rules={[
    //           { required: true, message: 'Please input your password!' },
    //           { min: 6, message: 'Password must be at least 6 characters.' }
    //         ]}
    //       >
    //         <Input.Password />
    //       </Form.Item>

    //       <Button type="primary" htmlType="submit" loading={loading}>
    //         Register
    //       </Button>
    //     </Form>

    //     <div className="mt-4 text-center">
    //       <p>
    //         Already have an account?{" "}
    //       <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
}



