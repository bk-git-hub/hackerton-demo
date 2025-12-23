import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Tag,
  ChevronLeft,
  Send,
  CheckCircle2,
  Clock,
  Save,
  X,
  ShieldCheck,
  UserPlus,
  Heart,
  Search,
  Check,
  Mail,
  UserCheck,
  Rocket,
  Zap,
} from 'lucide-react';
// 🔥 FindTeamMate 컴포넌트 임포트
import FindTeamMate from '../components/FindTeamMate';

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const editRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  const [role, setRole] = useState<'GUEST' | 'MEMBER' | 'LEADER'>('LEADER');
  const [isEditing, setIsEditing] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const [project, setProject] = useState({
    title: 'AI 기반 커리어 로드맵 플랫폼',
    category: 'WEB / AI',
    intro: '기술 스택 분석을 통한 개인별 커리어 항로 설계 시스템',
    description: `현재 많은 개발자들이 급변하는 기술 트렌드 속에서 자신의 위치와 다음 목표를 설정하는 데 어려움을 겪고 있습니다. \n\n우리는 ORBIT 시스템을 통해 사용자의 현재 역량을 데이터화하고, 목표 기업이나 직군에 도달하기 위한 최적의 학습 노드와 프로젝트 경험을 시각화하여 제공합니다.`,
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    techStack: ['React', 'TypeScript', 'Tailwind v4', 'Node.js', 'OpenAI'],
    currentMembers: [
      { id: 10, name: '박팀장', role: 'Leader / Backend' },
      { id: 11, name: '이디자', role: 'UI/UX Designer' },
    ],
    requiredRoles: ['Frontend (1명)', 'Backend (1명)', 'Data Engineer (1명)'],
  });

  const [applicants] = useState([
    { id: 1, name: '이민수', role: 'Frontend', sq: 92 },
    { id: 2, name: '박지영', role: 'UI Designer', sq: 85 },
  ]);

  useEffect(() => {
    if (isEditing) editRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* 배경 글로우 */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(30,58,138,0.2)_0%,_transparent_50%)] pointer-events-none" />

      {/* [1] 상단 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-3 -ml-3 text-slate-400 hover:text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <h2 className="font-black text-sm tracking-tight">
              {project.title}
            </h2>
            <div
              className={`text-[9px] font-black tracking-[0.2em] uppercase mt-0.5 ${
                role === 'LEADER' ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {role === 'LEADER' ? 'System Administrator' : 'Discovery Mode'}
            </div>
          </div>
          <div className="w-12 flex justify-end">
            {role === 'LEADER' && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  isEditing
                    ? 'bg-rose-500/20 text-rose-500'
                    : 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                }`}
              >
                <Zap size={20} className={isEditing ? 'fill-rose-500' : ''} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12 space-y-12">
        {/* [2] 히어로 섹션 */}
        <header className="relative space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-md uppercase tracking-widest">
              {project.category}
            </span>
            <span
              className={`flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-md border ${
                role === 'LEADER'
                  ? 'bg-slate-900 border-white/10 text-slate-300'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
            >
              {role === 'LEADER' ? (
                <ShieldCheck size={12} />
              ) : (
                <UserCheck size={12} />
              )}
              {role === 'LEADER' ? 'ADMIN ACCESS' : 'MEMBER ACCESS'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
            {isEditing ? (
              <input
                className="bg-transparent border-b-2 border-blue-500 outline-none w-full"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
            ) : (
              project.title
            )}
          </h1>
          <p className="text-xl text-slate-400 font-medium border-l-2 border-blue-500/50 pl-6 italic">
            "{project.intro}"
          </p>
        </header>

        {/* [3] 리더 대시보드 */}
        {role === 'LEADER' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 space-y-6">
              <h3 className="text-lg font-black flex items-center gap-2 text-white italic uppercase tracking-tighter">
                <Mail size={20} className="text-blue-500" /> Pending Crew
              </h3>
              {/* 지원자 리스트 생략 (기존과 동일) */}
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-blue-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-black flex items-center gap-2 text-white italic uppercase tracking-tighter mb-2">
                  <Search size={20} className="text-blue-400" /> Crew Discovery
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  AI가 분석한 최적의 시너지를 내는 <br />
                  새로운 팀원을 찾아보세요.
                </p>
              </div>
              <button
                onClick={() => setIsDiscoveryOpen(true)}
                className="relative z-10 mt-8 group flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all"
              >
                <Rocket
                  size={20}
                  className="group-hover:-translate-y-1 transition-transform"
                />
                신규 팀원 스캔하기
              </button>
            </div>
          </section>
        )}

        {/* 나머지 섹션 생략 (상세 설명, 기술 스택 등) */}
      </main>

      {/* [8] Crew Discovery Modal (FindTeamMate 통합) */}
      <AnimatePresence>
        {isDiscoveryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 w-full max-w-2xl rounded-[48px] p-6 md:p-10 relative border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.2)] overflow-hidden"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setIsDiscoveryOpen(false)}
                className="absolute top-8 right-8 z-[110] text-slate-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>

              {/* 🔥 통합된 FindTeamMate 컴포넌트 */}
              <div className="w-full flex flex-col items-center">
                <FindTeamMate />
              </div>

              {/* 하단 시스템 데코레이션 */}
              <div className="mt-8 flex justify-center">
                <p className="text-[9px] text-slate-600 font-black tracking-[0.4em] uppercase animate-pulse">
                  Initializing Neural Matching System...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 뷰 스위처 (개발용 하단 고정) */}
      <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-1 bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
        {(['GUEST', 'MEMBER', 'LEADER'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
              role === r
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
