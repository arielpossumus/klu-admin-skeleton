import { LoginForm } from "@/components/forms/LoginForm";
import kluLogLogin from "@/assets/kluLogoLogin.svg";
import splahsImage from "@/assets/splashLogin.png";

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background-login">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center gap-2 font-medium"
            aria-label="Inicio"
          >
            <img
              src={kluLogLogin}
              alt="Klu"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src={splahsImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-left dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
