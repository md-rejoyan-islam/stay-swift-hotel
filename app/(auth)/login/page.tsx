import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="container  min-h-[calc(100vh-4rem)] flex justify-center items-center ">
      <div className="mx-auto flex w-full h-fit flex-col justify-center space-y-6 sm:w-[350px] md:min-w-[450px] lg:p-8 border  rounded-xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-sky-100">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground dark:text-sky-300">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
