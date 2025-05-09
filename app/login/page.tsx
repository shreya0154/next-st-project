

"use client";

import React, { useState } from 'react'
import Link from 'next/link'
// import '@ant-design/v5-patch-for-react-19';
import {Button, Form, Input} from 'antd'
import { signIn } from "supertokens-web-js/recipe/emailpassword";
import { useRouter } from 'next/navigation';
import '../styles/style.scss'


export default function Login() {

const router = useRouter();
const [loading, setLoading] = useState(false);
async function signInClicked(values:any) {
  const {email, password} = values;
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            window.alert("Email password combination is incorrect.")
        } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign in was not allowed.
            window.alert(response.reason)
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/protectedPage"
        }
    } catch (err:any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops");
        }
    }
}
  return (
    <>
    {/* <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Form layout="vertical" onFinish={signInClicked}>
          
        <Form.Item label="Email" name = "email" 
              rules={[{ required: true, message: 'Please enter your email!' }]}>
                <Input type='email'/>
              </Form.Item>

              <Form.Item label="Password" name = "password"
              rules={[{ required: true, message: 'Please enter password!' }]}>
                <Input.Password />
              </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <span> Don't Have an Account ? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></span>
        </div>
      </div>
    </div> */}






    <div className="auth-page">
        <div className="auth-form">
        <h1>Login</h1>
              
          <Form layout="vertical" onFinish={signInClicked}>
          <Form.Item label="Email" name = "email" 
              rules={[{ required: true, message: 'Please enter your email!' }]}>
                <Input type='email'/>
              </Form.Item>

              <Form.Item label="Password" name = "password"
              rules={[{ required: true, message: 'Please enter password!' }]}>
                <Input.Password />
              </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <p>
          Don&apos;t Have an Account ?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>
        </div>
        </div>
    {/* </div> */}


</>

  )
}

// export default login;