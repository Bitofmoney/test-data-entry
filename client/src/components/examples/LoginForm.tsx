import { LoginForm } from '../LoginForm';

export default function LoginFormExample() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm
        onSubmit={(data) => console.log('Login submitted:', data)}
        onSignupClick={() => console.log('Navigate to signup')}
      />
    </div>
  );
}