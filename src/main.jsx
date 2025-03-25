import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './redux/store.jsx';
import { Provider } from 'react-redux'; // ✅ Correct import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* ✅ Correct usage */}
      <App />
      <ToastContainer 
      autoClose={600}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      />
    </Provider>
   
  </StrictMode>
);
