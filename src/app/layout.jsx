"use client"
import { Suspense} from "react";
import { Provider } from "react-redux";
import { Inter } from 'next/font/google'
import ReduxToastr from 'react-redux-toastr'

import './bootstrap.css'
import './custom.css'

import { store } from "@/redux/storeConfig/store";
import Spinner from "@/components/spinner/spinner";
import App from "./_app";

const inter = Inter({ subsets: ['latin'] })

// import internal(own) modules


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />      
      </head>
      <body className={`${inter.className} overflow-hidden`}>
        <Provider store={store}>
            <Suspense fallback={<Spinner />}>
              <App>{children}</App>
              <ReduxToastr
                  timeOut={4000}
                  newestOnTop={false}
                  preventDuplicates
                  position="top-left"
                  transitionIn="fadeIn"
                  transitionOut="fadeOut"
                  progressBar
                  closeOnToastrClick/>
            </Suspense>
        </Provider>
      </body>
    </html>
  )
}
