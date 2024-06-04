'use client'
import Sidebar from "@/components/sidebar"
import Botonera from "./components/botonera"
import Contenido from "./components/contenido"

export default function Reportes() {
    return (
      <main className="row">
        <Sidebar />
        <Botonera />
        <Contenido />
      </main>
    )
  }
  