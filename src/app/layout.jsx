"use client"
import { Provider } from "react-redux";
import { Inter } from 'next/font/google'

import { store } from "@/redux/storeConfig/store";

import './bootstrap.css'
import './custom.css'
import AuthContextProvider from "@/contexts/authContext";

const inter = Inter({ 
  subsets: ['latin'],
  preload: true
 })


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>AdminOrg</title>
        <meta name="title" content="AdminOrg" />
        <meta name="description" content="Gestión de organizaciones." />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />      
      </head>
      <body className={`${inter.className} overflow-hidden`}>
        <Provider store={store}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Provider>
      </body>
    </html>
  )
}
