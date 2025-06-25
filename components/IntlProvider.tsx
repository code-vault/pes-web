// components/IntlProvider.tsx

"use client";

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

// Define the type for our messages
type Messages = Record<string, any>;

interface IntlProviderProps {
  messages: Messages;
  locale: string;
  children: ReactNode;
}

export default function IntlProvider({ messages, locale, children }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}