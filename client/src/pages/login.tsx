
import { LoginForm } from "@/components/LoginForm";

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface LoginProps {
  onLogin: (userData: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={onLogin} />
      </div>
    </div>
  );
}
