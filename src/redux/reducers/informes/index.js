import { combineReducers } from 'redux';

import analizar from './analizar';
import agrupar_por from './agrupar_por';
import encolumnar from './encolumnar';
import totalizar from './totalizar';

export default combineReducers({
  analizar,
  agrupar_por,
  encolumnar,
  totalizar
  // desde,
  // hasta,
});
