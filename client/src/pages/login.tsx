import { LoginForm } from "@/components/LoginForm";

interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleSubmit = (data: any) => {
    console.log('Login data:', data);
    // Mock successful login
    if (onLogin) {
      onLogin();
    }
  };

  const handleSignupClick = () => {
    console.log('Navigate to signup');
    // In a real app, this would navigate to a signup page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleSubmit}
          onSignupClick={handleSignupClick}
        />
      </div>
    </div>
  );
}