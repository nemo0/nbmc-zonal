import { useEffect, useState } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export default function useAdminUser() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const payload = await response.json();

        if (!mounted) {
          return;
        }

        if (response.ok && payload?.user) {
          setUser(payload.user);
        } else {
          setUser(null);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, isLoading };
}
