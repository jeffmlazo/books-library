"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      // JEPROX: This will dictate the arrangement of the form fields in the form if we loop through in the AuthForm component
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default Page;
