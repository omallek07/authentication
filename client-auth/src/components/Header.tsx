import { useUserStore } from '../stores';

export default function Header() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;
  return (
    <div>
      <h1>Welcome, {user?.name ?? 'friend'}!</h1>
    </div>
  );
}
