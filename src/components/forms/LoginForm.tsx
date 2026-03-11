import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        defaultValues: { email: "", password: "" },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("Verificando usuario y contraseña...");
    const [okIcon, setOkIcon] = useState(false);

    const onSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDescription("Acceso Correcto, redirigiendo...");
            setOkIcon(true);
        }, 3000);
        setTimeout(() => {
            navigate("/dashboard");
        }, 5000);
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
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            aria-invalid={Boolean(errors.email)}
                                            {...register("email", {
                                                required: "El email es obligatorio",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Email no válido",
                                                },
                                            })}
                                        />
                                        <FieldError errors={errors.email ? [errors.email] : undefined} />
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
                                            aria-invalid={Boolean(errors.password)}
                                            {...register("password", {
                                                required: "La contraseña es obligatoria",
                                                minLength: {
                                                    value: 6,
                                                    message: "Mínimo 6 caracteres",
                                                },
                                            })}
                                        />
                                        <FieldError errors={errors.password ? [errors.password] : undefined} />
                                    </Field>
                                    <Field>
                                        <Button type="submit">Ingresar</Button>
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
