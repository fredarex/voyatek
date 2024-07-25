'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuthDataCookie() {
  const [authData, setAuthData] = useState<{ email: string, isLoggedIn: boolean } | null>(null);

  useEffect(() => {
    const cookieValue = Cookies.get('authData');
    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      setAuthData(parsedCookie);
    }
  }, []);

  return authData;
}
