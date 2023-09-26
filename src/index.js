import React, { Suspense ,StrictMode} from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <Suspense>
    <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>
  </DndProvider>
  </Suspense>
  </StrictMode>
);
