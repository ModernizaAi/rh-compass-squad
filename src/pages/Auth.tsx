
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

type AuthMode = "login" | "signup" | "forgot-password" | "update-password";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const signupSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

const updatePasswordSchema = z.object({
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const Auth = () => {
  const { user, signIn, signUp, resetPassword, updatePassword } = useAuth();
  const [searchParams] = useSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const updatePasswordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Check if we're in the update password flow
    if (window.location.hash.includes("type=recovery")) {
      setAuthMode("update-password");
    }
  }, []);

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setErrorMessage(null);
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      const errorMessage = error.message === "Invalid login credentials"
        ? "Credenciais inválidas. Por favor, verifique seu e-mail e senha."
        : "Erro ao fazer login. Por favor, tente novamente.";
      
      setErrorMessage(errorMessage);
    } else {
      navigate("/");
    }
  };

  const handleSignUp = async (data: z.infer<typeof signupSchema>) => {
    setErrorMessage(null);
    const { error } = await signUp(data.email, data.password, data.firstName, data.lastName);
    
    if (error) {
      if (error.message.includes("already registered")) {
        setErrorMessage("Este e-mail já está registrado. Tente fazer login ou recuperar sua senha.");
      } else {
        setErrorMessage("Erro ao criar conta. Por favor, tente novamente.");
      }
    } else {
      setSuccessMessage("Conta criada com sucesso! Verifique seu e-mail para confirmar o cadastro.");
      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu e-mail para confirmar o cadastro.",
      });
      setAuthMode("login");
    }
  };

  const handleForgotPassword = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setErrorMessage(null);
    const { error } = await resetPassword(data.email);
    
    if (error) {
      setErrorMessage("Erro ao enviar e-mail de recuperação. Verifique se o e-mail está correto.");
    } else {
      setSuccessMessage("E-mail de recuperação enviado. Verifique sua caixa de entrada.");
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para recuperar sua senha.",
      });
    }
  };

  const handleUpdatePassword = async (data: z.infer<typeof updatePasswordSchema>) => {
    setErrorMessage(null);
    const { error } = await updatePassword(data.password);
    
    if (error) {
      setErrorMessage("Erro ao atualizar senha. Por favor, tente novamente.");
    } else {
      toast({
        title: "Senha atualizada com sucesso!",
        description: "Você pode fazer login com sua nova senha agora.",
      });
      setAuthMode("login");
    }
  };

  // Redirect if user is already logged in
  if (user && authMode !== "update-password") {
    return <Navigate to="/" replace />;
  }

  const renderForm = () => {
    switch (authMode) {
      case "login":
        return (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="seu@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="******" 
                          className="pl-10 pr-10" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="px-0"
                  onClick={() => setAuthMode("forgot-password")}
                >
                  Esqueceu sua senha?
                </Button>
              </div>
              <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                Entrar
              </Button>
            </form>
          </Form>
        );
        
      case "signup":
        return (
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={signupForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Nome" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input placeholder="Sobrenome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="seu@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="******" 
                          className="pl-10 pr-10" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="******" 
                          className="pl-10 pr-10" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={signupForm.formState.isSubmitting}>
                Criar conta
              </Button>
            </form>
          </Form>
        );
        
      case "forgot-password":
        return (
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="seu@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-2">
                <Button type="submit" className="w-full" disabled={forgotPasswordForm.formState.isSubmitting}>
                  Enviar link de recuperação
                </Button>
                <Button type="button" variant="link" onClick={() => setAuthMode("login")}>
                  Voltar para o login
                </Button>
              </div>
            </form>
          </Form>
        );
        
      case "update-password":
        return (
          <Form {...updatePasswordForm}>
            <form onSubmit={updatePasswordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
              <FormField
                control={updatePasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="******" 
                          className="pl-10 pr-10" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updatePasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a nova senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="******" 
                          className="pl-10 pr-10" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={updatePasswordForm.formState.isSubmitting}>
                Atualizar senha
              </Button>
            </form>
          </Form>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">CompassHR</h1>
          <p className="text-gray-500 mt-2">Plataforma de Gestão de Recursos Humanos</p>
        </div>
        
        <Card>
          <CardHeader>
            {authMode === "forgot-password" ? (
              <>
                <CardTitle>Recuperar senha</CardTitle>
                <CardDescription>
                  Digite seu e-mail para receber um link de recuperação de senha
                </CardDescription>
              </>
            ) : authMode === "update-password" ? (
              <>
                <CardTitle>Criar nova senha</CardTitle>
                <CardDescription>
                  Digite e confirme sua nova senha
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle>Bem-vindo ao CompassHR</CardTitle>
                <CardDescription>
                  Faça login ou crie uma conta para continuar
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            {successMessage && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-100">
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            {authMode !== "forgot-password" && authMode !== "update-password" ? (
              <Tabs defaultValue="login" value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Cadastro</TabsTrigger>
                </TabsList>
                <TabsContent value="login">{renderForm()}</TabsContent>
                <TabsContent value="signup">{renderForm()}</TabsContent>
              </Tabs>
            ) : (
              renderForm()
            )}
          </CardContent>
          <CardFooter>
            {authMode !== "login" && authMode !== "signup" && (
              <div className="w-full text-center">
                <Button variant="link" onClick={() => setAuthMode("login")}>
                  Voltar para o login
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
