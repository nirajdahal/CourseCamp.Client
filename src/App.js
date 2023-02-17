import logo from './logo.svg';
import Navbar from './components/layouts/nabvar/Navbar'
import './App.css';
import BootcampForm from './components/bootcamp/BootcampForm';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../src/redux/slice/loadingSlice'
import GlobalErrorHandler from './components/error/GlobalErrorHandler';
import Loader from './components/loader/Loader'
function App() {
  const isLoading = useSelector(selectIsLoading)
  return (
    <>
      {isLoading && <Loader />}
      <div data-theme="dark" >
        {/* <GlobalErrorHandler /> */}
        <Navbar />
        <BootcampForm />
      </div>
    </>
  );
}
export default App;
