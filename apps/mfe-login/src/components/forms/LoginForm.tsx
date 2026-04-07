import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { setAuthSession } from "@klu/auth-session";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import EmptyCardLoader from "../loaders/EmptyCardLoader";
import type { LoginFormValues } from "@/types/auth/LoginFormValues";
import { loginService } from "@/services/auth/loginService";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null | undefined)?.from ??
    "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("Verificando usuario y contraseña...");
  const [okIcon, setOkIcon] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    setLoginError(null);
    setIsLoading(true);
    setDescription("Verificando usuario y contraseña...");
    setOkIcon(false);
    try {
      const data = await loginService.login({
        username: values.username.trim(),
        password: values.password,
      });
      setAuthSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        profile: {
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
      });
      setDescription("Acceso correcto, redirigiendo...");
      setOkIcon(true);
      window.setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "No se pudo iniciar sesión. Intentá de nuevo.";
      setLoginError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card>
        {isLoading ? <EmptyCardLoader title="Iniciando sesión" description={description} okIcon={okIcon} /> :
          <>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FieldGroup>           
                  <Field>
                    <FieldLabel htmlFor="username">Usuario</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="ej. emilys"
                      aria-invalid={Boolean(errors.username)}
                      aria-describedby="username-hint"
                      {...register("username", {
                        required: "El usuario es obligatorio",
                        minLength: {
                          value: 2,
                          message: "Mínimo 2 caracteres",
                        },
                      })}
                    />
                    <p id="username-hint" className="text-xs text-muted-foreground">
                      Prueba DummyJSON: <span className="font-mono">emilys</span> /{" "}
                      <span className="font-mono">emilyspass</span>
                    </p>
                    <FieldError errors={errors.username ? [errors.username] : undefined} />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={Boolean(errors.password)}
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                          value: 1,
                          message: "Ingresá tu contraseña",
                        },
                      })}
                    />
                    <FieldError errors={errors.password ? [errors.password] : undefined} />
                  </Field>
                  <Field>
                  {loginError != null && loginError !== "" && (
                    <p className="text-sm text-destructive" role="alert">
                      {loginError}
                    </p>
                  )}
                    <Button type="submit" className={cn("btn-form-action btn-primary w-full")}>Ingresar</Button>
                  </Field>
                 
                </FieldGroup>
              </form>
            </CardContent>
          </>
        }
      </Card>
    </div>
  );
}
