import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectPage from './pages/ProjectPage';
function App() {
  return (
    <div>
      <nav>
        {/* a 태그 대신 Link 컴포넌트를 사용해야 페이지가 새로고침되지 않습니다. */}
        <Link to="/">홈</Link> | <Link to="/projects/new">프로젝트 생성</Link> |{' '}
        <Link to="/projects/123">프로젝트 샘플</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/new" element={<ProjectCreatePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        {/* 404 페이지 설정 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
