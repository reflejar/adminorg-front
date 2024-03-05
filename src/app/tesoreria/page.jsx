'use client'
import Sidebar from "@/components/sidebar"
import Listado from "./components/listado"
import Contenido from "./components/contenido"

export default function Tesoreria() {
    return (
      <main className="row">
        <Sidebar />
        <Listado />
        <Contenido />
      </main>
    )
  }
  