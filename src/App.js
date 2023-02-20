import logo from './logo.svg';
import Navbar from './components/layouts/nabvar/Navbar'
import './App.css';
import BootcampForm from './components/bootcamp/createBootcamp/BootcampForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../src/redux/slice/loadingSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/loader/Loader'
import { useEffect } from 'react';
import { setupHttpInterceptors } from './services/bootcamp/BootcampService';
import ListBootcamp from './components/bootcamp/listBootcamp/ListBootcamp';
function App() {
  const isLoading = useSelector(selectIsLoading)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   setupHttpInterceptors(dispatch);
  // }, [dispatch]);
  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div data-theme="dark" >
        {/* <GlobalErrorHandler /> */}
        <Navbar />
        {/* <BootcampForm /> */}
        <ListBootcamp />
      </div>
    </>
  );
}
export default App;
