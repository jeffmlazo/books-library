"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      // JEPROX: This will dictate the arrangemnt of the form fields in the form if we loop through in the AuthForm component
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default Page;
