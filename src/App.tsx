import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <nav>
        {/* a 태그 대신 Link 컴포넌트를 사용해야 페이지가 새로고침되지 않습니다. */}
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* 404 페이지 설정 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
