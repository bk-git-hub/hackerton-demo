import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import FindTeamMate from '../components/FindTeamMate';

// --- Types ---
type Role = 'GUEST' | 'MEMBER' | 'LEADER';

interface Person {
  id: number;
  name: string;
  role: string;
}

interface ProjectDetail {
  title: string;
  category: string;
  intro: string;
  description: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  currentMembers: Person[];
  requiredRoles: string[];
}

const ProjectPage: React.FC = () => {
  // const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const editRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // --- States ---
  const [role, setRole] = useState<Role>('LEADER'); // 테스트용 초기값
  const [isEditing, setIsEditing] = useState(false);
  const [isTinderOpen, setIsTinderOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // --- Project Data ---
  const [project, setProject] = useState<ProjectDetail>({
    title: 'AI 기반 커리어 로드맵 플랫폼',
    category: '웹 서비스 / AI',
    intro: '취업 준비생들을 위해 AI가 맞춤형 로드맵을 그려주는 서비스입니다.',
    description: `현재 많은 취업 준비생들이 어떤 기술을 먼저 배워야 할지 혼란스러워합니다. \n우리는 OpenAI API를 활용하여 사용자의 현재 수준과 목표 기업을 분석하고, 최적의 학습 경로를 시각화하여 제공하는 서비스를 만들고자 합니다.`,
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
    currentMembers: [
      { id: 10, name: '김팀장', role: 'Leader / Backend' },
      { id: 11, name: '이디자', role: 'UI/UX Designer' },
    ],
    requiredRoles: ['Frontend Developer (1명)', 'Backend Developer (1명)'],
  });

  const [applicants, setApplicants] = useState<Person[]>([
    { id: 1, name: '이민수', role: 'Frontend' },
    { id: 2, name: '박지영', role: 'UI Designer' },
  ]);

  const [wishlist, setWishlist] = useState<Person[]>([
    { id: 101, name: '최강현', role: 'Backend' },
  ]);

  // const [inviteEmail, setInviteEmail] = useState('');

  // --- Handlers ---
  useEffect(() => {
    if (isEditing) editRef.current?.focus();
  }, [isEditing]);

  const handleApply = () => {
    if (confirm('이 프로젝트에 지원하시겠습니까?')) {
      setHasApplied(true);
      alert('지원이 완료되었습니다!');
    }
  };

  const handleApplicant = (id: number, action: 'accept' | 'reject') => {
    setApplicants(applicants.filter((a) => a.id !== id));
    alert(action === 'accept' ? '승인되었습니다.' : '거절되었습니다.');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans transition-colors duration-500">
      {/* 🛠 테스트용 역할 전환 버튼 */}
      <div className="fixed top-24 right-6 z-[60] flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-blue-100">
        <p className="text-[10px] font-black text-blue-500 text-center mb-2 uppercase">
          View Switcher
        </p>
        <button
          onClick={() => {
            setRole('GUEST');
            setIsEditing(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            role === 'GUEST' ? 'bg-blue-500 text-white' : 'bg-slate-100'
          }`}
        >
          방문객
        </button>
        <button
          onClick={() => {
            setRole('MEMBER');
            setIsEditing(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            role === 'MEMBER' ? 'bg-blue-600 text-white' : 'bg-slate-100'
          }`}
        >
          팀원
        </button>
        <button
          onClick={() => setRole('LEADER')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            role === 'LEADER' ? 'bg-slate-900 text-white' : 'bg-slate-100'
          }`}
        >
          팀장
        </button>
      </div>

      {/* 상단 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 truncate max-w-[200px]">
              {project.title}
            </span>
            <span
              className={`text-[10px] font-black ${
                role === 'LEADER' ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              {role === 'LEADER' ? 'PROJECT ADMIN' : 'PROJECT DETAIL'}
            </span>
          </div>
          {role === 'LEADER' ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                isEditing ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              {isEditing ? '취소' : '정보 수정'}
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10 space-y-8">
        {/* [1] 헤더 섹션 */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg uppercase tracking-tight">
              {project.category}
            </span>
            {role !== 'GUEST' && (
              <span
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg ${
                  role === 'LEADER'
                    ? 'bg-slate-900 text-white'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                {role === 'LEADER' ? (
                  <ShieldCheck size={14} />
                ) : (
                  <UserCheck size={14} />
                )}
                {role === 'LEADER' ? '팀장 권한' : '팀원 권한'}
              </span>
            )}
          </div>

          {isEditing ? (
            <input
              ref={editRef as any}
              className="w-full text-3xl md:text-4xl font-black text-slate-900 border-b-2 border-blue-500 outline-none pb-1"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
          ) : (
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>
          )}

          {isEditing ? (
            <input
              className="w-full text-xl text-blue-600 font-medium border-b border-blue-200 outline-none"
              value={project.intro}
              onChange={(e) =>
                setProject({ ...project, intro: e.target.value })
              }
            />
          ) : (
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-blue-200 pl-4">
              "{project.intro}"
            </p>
          )}
        </header>

        {/* [2] 모집 현황 (방문객 강조 버전 복원) */}
        <section
          className={`${role === 'GUEST' ? 'order-none' : 'opacity-80'}`}
        >
          <div
            className={`rounded-3xl p-6 md:p-8 space-y-6 border transition-all ${
              role === 'GUEST'
                ? 'bg-blue-50 border-blue-100 shadow-md'
                : 'bg-white border-slate-200'
            }`}
          >
            <h3
              className={`font-bold flex items-center gap-2 ${
                role === 'GUEST'
                  ? 'text-xl text-blue-900'
                  : 'text-lg text-slate-700'
              }`}
            >
              <Users size={22} />{' '}
              {role === 'GUEST' ? '현재 이런 팀원을 찾고 있어요!' : '모집 현황'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.requiredRoles.map((roleText, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-blue-50 shadow-sm"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Clock
                      size={18}
                      className={`${
                        role === 'GUEST'
                          ? 'text-blue-500 animate-pulse'
                          : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <p
                    className={`font-bold text-sm ${
                      role === 'GUEST' ? 'text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {roleText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [3] 팀장 전용 관리 보드 (LEADER 전용) */}
        {role === 'LEADER' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <Mail size={20} className="text-blue-500" /> 지원자 현황
              </h3>
              <div className="space-y-3">
                {applicants.length > 0 ? (
                  applicants.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                    >
                      <div>
                        <p className="font-bold text-sm text-slate-900">
                          {person.name}
                        </p>
                        <p className="text-xs text-slate-400 font-bold uppercase">
                          {person.role}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApplicant(person.id, 'accept')}
                          className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleApplicant(person.id, 'reject')}
                          className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-slate-300 text-sm italic">
                    대기 중인 지원자가 없습니다.
                  </p>
                )}
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  <Heart size={20} className="text-blue-500 fill-blue-500" />{' '}
                  관심 목록
                </h3>
                <button
                  onClick={() => setIsTinderOpen(true)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-blue-100"
                >
                  <Search size={14} /> 팀원 찾기
                </button>
              </div>
              <div className="space-y-3">
                {wishlist.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border-l-4 border-blue-400 shadow-sm"
                  >
                    <p className="font-bold text-sm text-slate-900">
                      {person.name}{' '}
                      <span className="text-[10px] text-slate-400 ml-1">
                        {person.role}
                      </span>
                    </p>
                    <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
                      <UserPlus size={14} /> 초대
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* [4] 프로젝트 상세 설명 */}
        <section className="space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Tag size={20} className="text-blue-600" /> 상세 설명
          </h3>
          {isEditing ? (
            <textarea
              className="w-full h-64 p-4 bg-slate-50 border-2 border-blue-100 rounded-2xl outline-none focus:border-blue-500 resize-none"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          ) : (
            <div className="text-slate-600 leading-loose whitespace-pre-wrap text-lg font-medium">
              {project.description}
            </div>
          )}
        </section>

        {/* [5] 기술 스택 & 팀원 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              참여 팀원 ({project.currentMembers.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project.currentMembers.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100"
                >
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                    {m.name[0]}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {m.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 저장 플로팅 버튼 (Leader Only & Editing) */}
        {isEditing && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-full font-black text-lg shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all"
            >
              <Save size={24} /> 변경 사항 저장
            </button>
          </div>
        )}
      </main>

      {/* [6] 방문객 전용 하단 바 (MEMBER, LEADER 뷰에서는 날라감) */}
      {role === 'GUEST' && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 z-40 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-4xl mx-auto flex gap-4">
            <button className="p-4 border border-slate-200 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-500">
              <Heart size={24} />
            </button>
            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl active:scale-95 ${
                hasApplied
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
              }`}
            >
              {hasApplied ? <CheckCircle2 size={24} /> : <Send size={24} />}
              {hasApplied ? '지원 완료' : '이 프로젝트에 지원하기'}
            </button>
          </div>
        </footer>
      )}

      {/* Tinder Slider Modal (Leader Only) */}
      {isTinderOpen && (
        <div className="fixed  inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl  p-8 relative shadow-2xl">
            <button
              onClick={() => setIsTinderOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
            <FindTeamMate />
          </div>
        </div>
      )}
    </div>
  );
};

// // --- Sub Components ---
// const InfoCard = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) => (
//   <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
//     <div className="text-blue-500 mb-2">{icon}</div>
//     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//       {label}
//     </p>
//     <p className="text-slate-900 font-extrabold text-sm mt-1">{value}</p>
//   </div>
// );

export default ProjectPage;
