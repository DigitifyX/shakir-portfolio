"use client";

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import Script from 'next/script';

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function CalendlyProvider() {
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
      />
    </>
  );
}
