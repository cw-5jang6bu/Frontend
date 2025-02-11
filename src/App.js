import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Checkout from "./Pages/CheckOut";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

// const hiddenNavPaths = ['/signin', '/signup', '/checkout'];
//
// // 네비게이션 표시 여부를 결정하는 Layout 컴포넌트
// function Layout({ children }) {
//     const location = useLocation();
//     const hideNavBar = hiddenNavPaths.includes(location.pathname); // 여러 경로 체크
//
//     return (
//         <div>
//             {!hideNavBar && <AppBar />}  {/* 조건부 렌더링 */}
//             {children}
//         </div>
//     );
// }

function App() {
    return (
        <Router>
            {/*<Layout>*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            {/*</Layout>*/}
        </Router>
    );
}

export default App;

