'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpinnerComponent from '@/components/spinner/spinner';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirige a la ruta "cuentas-a-cobrar" al cargar la página
    router.push('/cuentas-a-cobrar');
  }, []); // El segundo parámetro vacío asegura que este efecto se ejecute solo una vez al cargar la página

  // Puedes renderizar cualquier contenido adicional si es necesario
  return ""
};

export default IndexPage;