import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../constants/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const getInitialLang = () => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('lang') === 'hi') return 'hi';
    }
    return 'en';
  };

  const [language, setLanguage] = useState(getInitialLang); // 'en' or 'hi'
  
  // Demo users allowing instant state switching for evaluation
  const initialDemoUsers = [
    {
      _id: '6ab3e762db9b007944949aef',
      name: 'Rohan Sharma',
      email: 'rohan@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      referralCode: 'referral123',
      defaultState: 'registered',
    },
    {
      _id: '6ab3e762db9b007944949af1',
      name: 'Priya Patel',
      email: 'priya@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      referralCode: 'priya456',
      defaultState: 'not_registered',
    },
  ];

  const getInitialUser = () => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('user') === 'priya') return initialDemoUsers[1];
    }
    return initialDemoUsers[0];
  };

  const [demoUsers, setDemoUsers] = useState(initialDemoUsers);
  const [currentUser, setCurrentUser] = useState(getInitialUser);
  const [toastMessage, setToastMessage] = useState(null);

  const toggleLanguage = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  const showToast = useCallback((msg, duration = 3000) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  }, []);

  const t = useCallback(
    (key, params = {}) => {
      let text = translations[language]?.[key] || translations.en[key] || key;
      Object.keys(params).forEach((p) => {
        text = text.replace(`{${p}}`, params[p]);
      });
      return text;
    },
    [language]
  );

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        currentUser,
        setCurrentUser,
        demoUsers,
        setDemoUsers,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
