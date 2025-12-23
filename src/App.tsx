import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectPage from './pages/ProjectPage';
import Setting from './pages/Setting';
import Header from './components/Header';
import ProjectGalaxyView from './components/Galaxy/ProjectGalaxyView';
import MainHero from './pages/Home';
import TeamCreatePage from './pages/ProjectCreatePage';
import SignUpPage from './pages/SignupPage';
export default function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<MainHero />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/projects/new" element={<TeamCreatePage />} />
        <Route path="/explore" element={<ProjectGalaxyView />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />

        {/* 404 페이지 설정 */}
        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </div>
  );
}
