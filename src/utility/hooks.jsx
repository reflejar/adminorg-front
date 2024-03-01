'use client'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import get from 'lodash/get';

import { clientesActions } from '@/redux/actions/clientes';
import { proveedoresActions } from '@/redux/actions/proveedores';
import { puntosActions } from '@/redux/actions/puntos';
import { deudasActions } from '@/redux/actions/deudas';
import { saldosActions } from '@/redux/actions/saldos';
import { cuentasActions } from '@/redux/actions/cuentas';
import { titulosActions } from '@/redux/actions/titulos';
import { ingresosActions } from '@/redux/actions/ingresos';
import { gastosActions } from '@/redux/actions/gastos';
import { cajasActions } from '@/redux/actions/cajas';
import { interesesActions } from '@/redux/actions/intereses';
import { descuentosActions } from '@/redux/actions/descuentos';
import { retencionesActions } from '@/redux/actions/retenciones';

// Parametros
export const useClientes = () => {
  const [loading, setLoading] = useState(false);
  const clientes = useSelector((state) => state.clientes.list);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(clientesActions.get_all())
        .finally(() => setLoading(false));
    }
    if (clientes.length === 0) {
      fetch();
    }
  }, []);

  return [clientes, loading];
};

export const useProveedores = () => {
  const [loading, setLoading] = useState(false);
  const proveedores = useSelector((state) => state.proveedores.list);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(proveedoresActions.get_all())
        .finally(() => setLoading(false));
    }
    if (proveedores.length === 0) {
      fetch();
    }
  }, []);

  return [proveedores, loading];
};
export const usePuntosDeVenta = () => {
  const [loading, setLoading] = useState(false);
  const puntos = useSelector((state) => state.puntos.list.results || []);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(puntosActions.get_all())
        .finally(() => setLoading(false));
    }
    if (puntos.length === 0) {
      fetch();
    }
  }, []);

  return [puntos, loading];
};

export const useTitulos = (supertitulos=false) => {
  const [loading, setLoading] = useState(false);
  const titulos = useSelector((state) => state.titulos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(titulosActions.get_all())
        .finally(() => setLoading(false));
    }
    if (titulos.length === 0) {
      fetch();
    }
  }, []);

  return [titulos, loading];
};

export const useIngresos = () => {
  const [loading, setLoading] = useState(false);
  const ingresos = useSelector((state) => state.ingresos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(ingresosActions.get_all())
        .finally(() => setLoading(false));
    }
    if (ingresos.length === 0) {
      fetch();
    }
  }, []);

  return [ingresos, loading];
};

export const useGastos = () => {
  const [loading, setLoading] = useState(false);
  const gastos = useSelector((state) => state.gastos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(gastosActions.get_all())
        .finally(() => setLoading(false));
    }
    if (gastos.length === 0) {
      fetch();
    }
  }, []);

  return [gastos, loading];
};

export const useCajas = () => {
  const [loading, setLoading] = useState(false);
  const cajas = useSelector((state) => state.cajas.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(cajasActions.get_all())
        .finally(() => setLoading(false));
    }
    if (cajas.length === 0) {
      fetch();
    }
  }, []);

  return [cajas, loading];
};

export const useIntereses = () => {
  const [loading, setLoading] = useState(false);
  const intereses = useSelector((state) => state.intereses.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(interesesActions.get_all())
        .finally(() => setLoading(false));
    }
    if (intereses.length === 0) {
      fetch();
    }
  }, []);

  return [intereses, loading];
};

export const useDescuentos = () => {
  const [loading, setLoading] = useState(false);
  const descuentos = useSelector((state) => state.descuentos.list);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await dispatch(descuentosActions.get_all())
        .finally(() => setLoading(false));
    }
    if (descuentos.length === 0) {
      fetch();
    }
  }, []);

  return [descuentos, loading];
};

export const useRetenciones = () => {
  const [loading, setLoading] = useState(false);
  const retenciones = useSelector((state) => get(state, 'retenciones.list', []));
  const [listado, setListado] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRet() {
      setLoading(true);
      await dispatch(retencionesActions.get_all())
        .finally(() => setLoading(false));
    }
    if (!listado) {
      fetchRet();
      setListado([...retenciones])
    }
  }, [setLoading, dispatch, listado, setListado, retenciones]);

  return [retenciones, loading];
};

// Otros
export const useDeudas = (selected, date) => {
  const [loading, setLoading] = useState(false);
  const [deudas, setDeudas] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selected) {
      setLoading(true);
      dispatch(deudasActions.get({ destinatario: selected.id, fecha: moment(date).format('YYYY-MM-DD') }))
        .then((response) => setDeudas(response.data))
        .finally(() => setLoading(false));
    }
  }, [selected]);

  return [deudas, loading];
};



export const useEstadoCuenta = (selected) => {
  const [loading, setLoading] = useState(false);
  const cuentas = useSelector(state => state.cuentas.list);
  const page = useSelector(state => state.cuentas.page);
  const [paginator, setPaginator] = useState({});
  const dispatch = useDispatch();

  const setPage = (number) => {
    dispatch({
      type: 'SET_PAGE_STATUS_CUENTAS',
      payload: number
    });
  }
  
  useEffect(() => {
    if (selected) {
      setLoading(true);
      const esTitulo = selected.hasOwnProperty("supertitulo");
      let query = { destinatario: selected.id, fecha: moment().format('YYYY-MM-DD'), page: page, save:true }
      if (esTitulo) {
        query = {...query, titulo:1};
      }

      dispatch(cuentasActions.get(query))
        .then((response) => {
          setPaginator(response.paginator)
        })
        .finally(() => setLoading(false));
    }
  }, [selected.id, page]);

  const infoPaginator = {
    page,
    ...paginator,
    setPage
  }

  return [cuentas, loading, infoPaginator];
};

export const useSaldos = (selected, date) => {
  const [loading, setLoading] = useState(false);
  const [saldos, setSaldos] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (selected) {
      setLoading(true);
      dispatch(saldosActions.get({ destinatario: selected.id, fecha: moment(date).format('YYYY-MM-DD') }))
        .then((response) => setSaldos(response.data))
        .finally(() => setLoading(false));
    }
  }, [selected]);

  return [saldos, loading];

};



export const useDisponibilidades = (date) => {
  const [loading, setLoading] = useState(false);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
      dispatch(saldosActions.get({ destinatario: "caja", fecha: moment(date).format('YYYY-MM-DD') }))
      .then((response) => setDisponibilidades(response))
      .finally(() => setLoading(false));
  }, []);

  return [disponibilidades, loading];

};