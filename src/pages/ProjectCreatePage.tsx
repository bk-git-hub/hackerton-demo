import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  ArrowRight,
} from 'lucide-react';

// --- Types ---
type Step = 1 | 2 | 3 | 4 | 5;
type TeamType = 'Capstone' | 'Project' | 'Study' | '';

interface TeamForm {
  type: TeamType;
  subject: string;
  intro: string;
  description: string;
  startDate: string; // 시작일
  endDate: string; // 마감일
  positions: string[]; // 인원수 없이 직군명만 저장
}

const TeamCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TeamForm>({
    type: '',
    subject: '',
    intro: '',
    description: '',
    startDate: '',
    endDate: '',
    positions: [],
  });

  // Callback Ref: 자동 포커스 시스템
  const focusRef = useCallback(
    (node: any) => {
      if (node) {
        requestAnimationFrame(() => node.focus());
      }
    },
    [currentStep],
  );

  const next = () => setCurrentStep((s) => Math.min(s + 1, 5) as Step);
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1) as Step);

  const generateAiDescription = async () => {
    setIsAiLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const aiText = `[${formData.subject}] 프로젝트는 ${formData.intro}를 목표로 하는 혁신적인 여정입니다.\n\n오르빗 시스템을 통해 최적의 시너지를 낼 팀원을 기다리고 있습니다.`;
    setFormData((prev) => ({ ...prev, description: aiText }));
    setIsAiLoading(false);
  };

  const togglePosition = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.includes(role)
        ? prev.positions.filter((r) => r !== role)
        : [...prev.positions, role],
    }));
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return formData.type === '';
    if (currentStep === 2) return formData.subject.trim() === '';
    if (currentStep === 3) return formData.intro.trim() === '';
    if (currentStep === 5)
      return (
        formData.startDate === '' ||
        formData.endDate === '' ||
        formData.positions.length === 0
      );
    return false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isNextDisabled()) {
      if (currentStep >= 1 && currentStep <= 3) {
        e.preventDefault();
        next();
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] shadow-2xl overflow-hidden border border-white/10 relative z-10">
        {/* 프로그레스 바 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
          <motion.div
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_#3b82f6]"
          />
        </div>

        <div className="p-10 sm:p-12">
          <header className="mb-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-400 font-black text-xs tracking-[0.3em] uppercase mb-2"
            >
              <Rocket size={14} /> Stage 0{currentStep}
            </motion.div>
            <h1 className="text-2xl font-black text-white leading-tight tracking-tighter">
              {currentStep === 1 && '어떤 종류의 팀인가요?'}
              {currentStep === 2 && '팀의 제목을 입력해 주세요'}
              {currentStep === 3 && '팀을 한 줄로 소개해 주세요'}
              {currentStep === 4 && '상세 내용을 작성해 주세요'}
              {currentStep === 5 && '모집 조건과 기간을 설정해 주세요'}
            </h1>
          </header>

          <main className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 1: 타입 선택 */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: 'Capstone',
                        label: 'Capstone Design',
                        icon: <GraduationCap size={20} />,
                      },
                      {
                        id: 'Project',
                        label: 'Side Project',
                        icon: <Briefcase size={20} />,
                      },
                      {
                        id: 'Study',
                        label: 'Skill Study',
                        icon: <BookOpen size={20} />,
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            type: item.id as TeamType,
                          });
                          next();
                        }}
                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                          formData.type === item.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-white/5 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={
                              formData.type === item.id
                                ? 'text-blue-400'
                                : 'text-slate-500'
                            }
                          >
                            {item.icon}
                          </div>
                          <span
                            className={`font-bold ${
                              formData.type === item.id
                                ? 'text-white'
                                : 'text-slate-400'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight
                          size={18}
                          className={
                            formData.type === item.id
                              ? 'text-blue-400'
                              : 'text-slate-800'
                          }
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2 & 3: 제목 및 한 줄 소개 */}
                {(currentStep === 2 || currentStep === 3) && (
                  <input
                    ref={focusRef}
                    key={`input-${currentStep}`}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-xl p-4 border-b-2 border-white/10 focus:border-blue-500 outline-none transition-all font-bold text-white placeholder:text-slate-800"
                    placeholder={currentStep === 2 ? '팀명' : '한 줄 소개'}
                    value={
                      currentStep === 2 ? formData.subject : formData.intro
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [currentStep === 2 ? 'subject' : 'intro']:
                          e.target.value,
                      })
                    }
                  />
                )}

                {/* Step 4: 상세설명 */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <button
                      onClick={generateAiDescription}
                      disabled={isAiLoading}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-blue-500 transition-all disabled:opacity-50"
                    >
                      <Sparkles
                        size={16}
                        className={isAiLoading ? 'animate-spin' : ''}
                      />
                      {isAiLoading ? 'AI 분석 중...' : 'AI 상세 소개 생성'}
                    </button>
                    <textarea
                      ref={focusRef}
                      className="w-full h-44 p-5 bg-white/5 border-2 border-white/5 rounded-2xl focus:border-blue-500/50 outline-none text-sm leading-relaxed text-slate-300 resize-none"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {/* 🔥 Step 5: 날짜 선택 및 모집 직군 (컴팩트 버전) */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95">
                    {/* 기간 선택 (캘린더 방식) */}
                    <section>
                      <h3 className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calendar size={12} /> Mission Schedule
                      </h3>
                      <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          className="bg-transparent text-sm font-bold text-white outline-none w-full [color-scheme:dark]"
                        />
                        <ArrowRight
                          size={16}
                          className="text-slate-700 shrink-0"
                        />
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className="bg-transparent text-sm font-bold text-white outline-none w-full [color-scheme:dark]"
                        />
                      </div>
                    </section>

                    {/* 직군 선택 (인원수 제외, 작은 버튼 형식) */}
                    <section>
                      <h3 className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Users size={12} /> Recruitment Roles
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '#기획',
                          '#디자인',
                          '#프론트',
                          '#백엔드',
                          '#AI/데이터',
                          '#기타',
                        ].map((role) => (
                          <button
                            key={role}
                            onClick={() => togglePosition(role)}
                            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                              formData.positions.includes(role)
                                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                                : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/30'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 하단 네비게이션 */}
          <footer className="mt-10 flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={prev}
                className="flex-1 p-4 text-slate-500 font-bold hover:text-white transition-all text-sm"
              >
                이전
              </button>
            )}
            <button
              onClick={currentStep === 5 ? () => alert('팀 생성 완료!') : next}
              disabled={isNextDisabled()}
              className={`flex-[2] py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
                isNextDisabled()
                  ? 'bg-white/5 text-slate-700'
                  : 'bg-white text-slate-950 hover:bg-blue-400 shadow-xl active:scale-95'
              }`}
            >
              {currentStep === 5 ? '프로젝트 궤도 생성' : '다음 단계'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TeamCreatePage;
