import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="container  min-h-[calc(100vh-4rem)] flex justify-center items-center ">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:min-w-[450px] sm:w-[350px] p-6 border rounded-xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-sky-100">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground dark:text-sky-300">
            Enter your details to create your account
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
