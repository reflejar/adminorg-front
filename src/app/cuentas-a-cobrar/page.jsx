'use client'
import Sidebar from "@/components/sidebar"
import Listado from "./components/listado"
import Contenido from "./components/contenido"

export default function CuentasACobrar() {
    return (
      <main className="row animate__animated animate__bounceInRight animate__faster">
        <Sidebar />
        <Listado />
        <Contenido />
      </main>
    )
  }
  