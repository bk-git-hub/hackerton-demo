import React from 'react';
import MainHero from '../components/MainHero';
import ProjectList from '../components/ProjectList';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* 1. 히어로 섹션: 브랜딩 및 특별 탐색 진입 */}
      <MainHero />

      {/* 2. 구분선: 섹션 간의 부드러운 전이 */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* 3. 리스트 섹션: 일반 검색 및 팀 매칭 피드 */}
      <ProjectList />

      {/* 4. 푸터 */}
      <footer className="py-10 text-center border-t border-white/5 bg-slate-950">
        <p className="text-slate-600 text-xs font-mono tracking-widest">
          © 2025 ORBIT SYSTEM. ALL TRAJECTORIES CALCULATED.
        </p>
      </footer>
    </div>
  );
}
