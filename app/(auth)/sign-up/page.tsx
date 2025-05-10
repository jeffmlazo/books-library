"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
const Page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      // JEPROX: This will dictate the arrangement of the form fields in the form if we loop through in the AuthForm component
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0, // JEPROX: Need to add checker & notify the user that the University ID is duplicate & the length max range
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default Page;
