import { currentUser } from '@repo/auth/server';

export async function Dashboard() {
  const user = await currentUser();

  const userName = user?.firstName ?? user?.lastName ?? user?.username;
  const salutation = userName ? `Welcome back, ${userName}!` : 'Welcome back!';

  return (
    <div className="@container space-y-4 pb-10">
      <h1 className="mb-1 font-bold text-3xl">Dashboard</h1>
      <p className="mb-4 text-muted-foreground">{salutation} Here's an overview of...</p>
    </div>
  );
}
