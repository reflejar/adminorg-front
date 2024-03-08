'use client'
import Sidebar from "@/components/sidebar"
import Botonera from "./components/botonera"
import Contenido from "./components/contenido"

export default function Informes() {
    return (
      <main className="row">
        <Sidebar />
        <Contenido />
        <Botonera />
      </main>
    )
  }
  