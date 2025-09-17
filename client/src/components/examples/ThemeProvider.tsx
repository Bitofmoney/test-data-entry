import { ThemeProvider } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { useTheme } from '../ThemeProvider';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      data-testid="button-theme-toggle"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'} Toggle Theme
    </Button>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <ThemeToggle />
        <div className="mt-4 p-4 bg-card border rounded-md">
          <h3 className="text-lg font-medium">Theme Provider Test</h3>
          <p className="text-muted-foreground">This should adapt to theme changes.</p>
        </div>
      </div>
    </ThemeProvider>
  );
}