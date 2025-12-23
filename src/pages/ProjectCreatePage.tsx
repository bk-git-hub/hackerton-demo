import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  CheckCircle2,
} from 'lucide-react';

// --- Types ---
type Step = 1 | 2 | 3 | 4 | 5;

interface ProjectForm {
  subject: string;
  intro: string;
  description: string;
  recommendedRoles: string[];
}

const ProjectCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProjectForm>({
    subject: '',
    intro: '',
    description: '',
    recommendedRoles: [],
  });
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // --- Logic ---
  const next = () => setCurrentStep((s) => Math.min(s + 1, 5) as Step);
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1) as Step);

  const handleFinalSubmit = () => {
    console.log('최종 데이터:', formData);
    // 실제 환경에서는 여기서 API POST 요청을 보냅니다.
    alert('프로젝트가 성공적으로 생성되었습니다!');
    navigate('/projects'); // 생성 후 리스트 페이지로 이동
  };

  useEffect(() => {
    // currentStep이 바뀔 때마다 실행됨
    // 조금의 지연시간을 주면(setTimeout) 애니메이션 도중 포커스가 씹히는 현상을 방지할 수 있습니다.
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100); // 100ms 정도면 사용자가 느끼지 못할 만큼 빠릅니다.

    return () => clearTimeout(timer);
  }, [currentStep]); // currentStep이 변경될 때마다 트리거

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 1. 엔터 키인지 확인
    // 2. 현재 단계의 필수 값이 입력되었는지 확인 (isNextDisabled 활용)
    if (e.key === 'Enter' && !isNextDisabled()) {
      // Step 3는 textarea이므로 기본 엔터(줄바꿈)를 허용하기 위해 제외하거나
      // Shift + Enter 일 때만 넘어가게 할 수도 있습니다.
      // 여기서는 일반 input 단계(1, 2)에서만 동작하게 설정합니다.
      if (currentStep === 1 || currentStep === 2) {
        e.preventDefault(); // 엔터 시 폼 제출 방지
        next();
      } else if (currentStep === 4) {
        // Step 4(추천/생성) 단계에서 엔터 시 바로 제출
        handleFinalSubmit();
      }
    }
  };

  const handleAiRecommendation = async () => {
    setIsAiLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormData((prev) => ({
      ...prev,
      recommendedRoles: [
        '프론트엔드 개발자',
        'UI/UX 디자이너',
        '백엔드 개발자',
      ],
    }));
    setIsAiLoading(false);
  };

  // --- Dynamic Button Text Logic ---
  const getNextButtonText = () => {
    if (currentStep === 1 || currentStep === 2) return '다음 단계';
    if (currentStep === 3) {
      return formData.description.trim() === '' ? '건너뛰기' : '다음 단계';
    }
    if (currentStep === 4) return '프로젝트 생성하기';
    return '매칭 완료';
  };

  const isNextDisabled = () => {
    if (currentStep === 1) return formData.subject.trim() === '';
    if (currentStep === 2) return formData.intro.trim() === '';
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* 상단 프로그레스 바 */}
        <div className="flex w-full h-1.5 bg-slate-100">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 transition-all duration-500 ${
                currentStep >= s ? 'bg-blue-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        <div className="p-8 sm:p-10">
          <header className="mb-10">
            <p className="text-blue-600 font-bold text-xs tracking-widest mb-2 uppercase">
              Step 0{currentStep}
            </p>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              {currentStep === 1 && '어떤 주제의 프로젝트인가요?'}
              {currentStep === 2 && '한 줄로 멋지게 소개해볼까요?'}
              {currentStep === 3 && '상세한 설명을 적어주세요 (선택)'}
              {currentStep === 4 && 'AI가 필요한 인원을 추천해드려요'}
              {currentStep === 5 && '함께할 팀원을 스와이프해보세요'}
            </h1>
          </header>

          <main className="min-h-[260px]">
            {/* Step 1: 주제 (필수) */}
            {currentStep === 1 && (
              <input
                ref={
                  inputRef
                    ? (inputRef as React.RefObject<HTMLInputElement>)
                    : undefined
                }
                type="text"
                className="w-full text-lg p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all"
                placeholder="예: 프로젝트 매칭 플랫폼 개발"
                value={formData.subject}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            )}

            {/* Step 2: 한줄소개 (필수) */}
            {currentStep === 2 && (
              <input
                ref={
                  inputRef
                    ? (inputRef as React.RefObject<HTMLInputElement>)
                    : undefined
                }
                type="text"
                className="w-full text-lg p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all"
                placeholder="예: 팀원 찾기가 즐거워지는 서비스"
                value={formData.intro}
                onKeyDown={handleKeyDown}
                onChange={(e) =>
                  setFormData({ ...formData, intro: e.target.value })
                }
              />
            )}

            {/* Step 3: 상세설명 (선택 - 동적 버튼 적용) */}
            {currentStep === 3 && (
              <textarea
                className="w-full h-40 text-base p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none"
                ref={
                  inputRef
                    ? (inputRef as React.RefObject<HTMLTextAreaElement>)
                    : undefined
                }
                placeholder="내용을 입력하지 않으면 '건너뛰기'로 진행됩니다."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            )}

            {/* Step 4: AI 인원 추천 (선택 - 생성하기 버튼 적용) */}
            {currentStep === 4 && (
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={handleAiRecommendation}
                  disabled={isAiLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-50 text-blue-700 rounded-2xl font-bold hover:bg-blue-100 transition-all border-2 border-blue-100"
                >
                  <Sparkles
                    size={18}
                    className={isAiLoading ? 'animate-spin' : ''}
                  />
                  {isAiLoading ? '분석 중...' : 'AI에게 추천 인원 받기'}
                </button>
                {formData.recommendedRoles.length > 0 && (
                  <div className="w-full space-y-2 animate-in fade-in zoom-in-95 duration-300">
                    {formData.recommendedRoles.map((role, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-700"
                      >
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        {role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: 팀원 매칭 (기존 틴더 영역) */}
            {currentStep === 5 && (
              <div className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <User className="text-slate-300 mb-2" size={48} />
                <p className="text-slate-500 font-medium italic">
                  Tinder Slider Area
                </p>
              </div>
            )}
          </main>

          {/* 하단 네비게이션 */}
          <footer className="mt-10 flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={prev}
                className="flex-1 flex items-center justify-center gap-1 p-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                <ChevronLeft size={20} /> 이전
              </button>
            )}

            <button
              onClick={currentStep === 4 ? handleFinalSubmit : next}
              disabled={isNextDisabled()}
              className={`flex-[2] flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all ${
                isNextDisabled()
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg active:scale-95'
              }`}
            >
              {getNextButtonText()}
              {currentStep < 4 && <ChevronRight size={20} />}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreatePage;
