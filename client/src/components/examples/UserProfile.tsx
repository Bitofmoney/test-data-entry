import { UserProfile } from '../UserProfile';

export default function UserProfileExample() {
  return (
    <div className="min-h-screen bg-background p-6">
      <UserProfile
        onSettingsClick={() => console.log('Settings clicked')}
        onSignOut={() => console.log('Sign out clicked')}
      />
    </div>
  );
}