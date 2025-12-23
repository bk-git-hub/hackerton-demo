import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Rocket,
  Mail,
  Lock,
  User as UserIcon,
} from 'lucide-react';

// --- Types ---
type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface SignUpForm {
  // Step 1: 기본 정보
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  // Step 2-6: 프로필 정보
  positions: string[];
  teamTypes: string[];
  durations: string[];
  timeSlots: string[];
  techStacks: string[];
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    positions: [],
    teamTypes: [],
    durations: [],
    timeSlots: [],
    techStacks: [],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // 자동 포커스
  useEffect(() => {
    if (currentStep === 1) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [currentStep]);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 6) as Step);
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1) as Step);

  const toggleItem = (key: keyof SignUpForm, item: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(item)
        ? (prev[key] as string[]).filter((i) => i !== item)
        : [...(prev[key] as string[]), item],
    }));
  };

  // --- 유효성 검사 로직 ---
  const isNextDisabled = () => {
    if (currentStep === 1) {
      const { email, username, password, passwordConfirm } = formData;
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPasswordMatch = password === passwordConfirm && password !== '';
      return !isEmailValid || username.length < 2 || !isPasswordMatch;
    }
    if (currentStep === 2) return formData.positions.length === 0;
    if (currentStep === 3) return formData.teamTypes.length === 0;
    if (currentStep === 4) return formData.durations.length === 0;
    if (currentStep === 5) return formData.timeSlots.length === 0;
    if (currentStep === 6) return formData.techStacks.length === 0;
    return false;
  };

  const handleComplete = () => {
    // API 연동 시 이 formData를 서버로 전송
    console.log('최종 회원가입 데이터:', formData);
    alert('회원가입이 완료되었습니다!');
    navigate('/explore');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/10 relative z-10 overflow-hidden">
        {/* 상단 프로그레스 바 */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
          <motion.div
            animate={{ width: `${(currentStep / 6) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
          />
        </div>

        <div className="p-10 sm:p-14">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-blue-400 font-black text-xs tracking-[0.3em] uppercase mb-3">
              <Rocket size={14} /> Stage 0{currentStep}
            </div>
            <h1 className="text-3xl font-black text-white leading-tight tracking-tighter">
              {currentStep === 1 && '기본 정보를 입력해주세요'}
              {currentStep === 2 && '현재 어떤 역할을 맡고 계신가요?'}
              {currentStep === 3 && '어떤 팀을 찾고 계신가요?'}
              {currentStep === 4 && '선호하는 활동 기간은?'}
              {currentStep === 5 && '활동 가능한 시간대를 알려주세요'}
              {currentStep === 6 && '보유하신 기술 스택을 선택해주세요'}
            </h1>
          </header>

          <main className="min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {/* Step 1: 기본 가입 정보 (신규 추가) */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <InputField
                      ref={inputRef}
                      icon={<Mail size={18} />}
                      type="email"
                      placeholder="이메일 주소"
                      value={formData.email}
                      onChange={(e: any) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <InputField
                      icon={<UserIcon size={18} />}
                      type="text"
                      placeholder="닉네임 (2자 이상)"
                      value={formData.username}
                      onChange={(e: any) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                    <InputField
                      icon={<Lock size={18} />}
                      type="password"
                      placeholder="비밀번호"
                      value={formData.password}
                      onChange={(e: any) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <InputField
                      icon={<Lock size={18} />}
                      type="password"
                      placeholder="비밀번호 확인"
                      value={formData.passwordConfirm}
                      isError={
                        formData.passwordConfirm !== '' &&
                        formData.password !== formData.passwordConfirm
                      }
                      onChange={(e: any) =>
                        setFormData({
                          ...formData,
                          passwordConfirm: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                {/* Step 2: 포지션 */}
                {currentStep === 2 && (
                  <div className="flex flex-wrap gap-3">
                    {[
                      '기획자',
                      '디자이너',
                      '프론트엔드',
                      '백엔드',
                      'iOS',
                      '안드로이드',
                      '데브옵스',
                      'AI 엔지니어',
                    ].map((item) => (
                      <TagButton
                        key={item}
                        label={item}
                        selected={formData.positions.includes(item)}
                        onClick={() => toggleItem('positions', item)}
                      />
                    ))}
                  </div>
                )}

                {/* Step 3: 팀 타입 */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 gap-3">
                    {['프로젝트', '스터디', '캡스톤'].map((id) => (
                      <SelectionCard
                        key={id}
                        title={id}
                        selected={formData.teamTypes.includes(id)}
                        onClick={() => toggleItem('teamTypes', id)}
                      />
                    ))}
                  </div>
                )}

                {/* Step 4: 기간 */}
                {currentStep === 4 && (
                  <div className="grid grid-cols-2 gap-4">
                    {['단기', '장기'].map((id) => (
                      <SelectionCard
                        key={id}
                        title={id}
                        selected={formData.durations.includes(id)}
                        onClick={() => toggleItem('durations', id)}
                      />
                    ))}
                  </div>
                )}

                {/* Step 5: 시간대 */}
                {currentStep === 5 && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      '평일 오전',
                      '평일 오후',
                      '평일 저녁',
                      '주말 오전',
                      '주말 오후',
                      '주말 저녁',
                    ].map((item) => (
                      <TagButton
                        key={item}
                        label={item}
                        selected={formData.timeSlots.includes(item)}
                        onClick={() => toggleItem('timeSlots', item)}
                      />
                    ))}
                  </div>
                )}

                {/* Step 6: 기술스택 */}
                {currentStep === 6 && (
                  <div className="flex flex-wrap gap-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                    {[
                      'React',
                      'TypeScript',
                      'Next.js',
                      'Node.js',
                      'Spring',
                      'Java',
                      'Python',
                      'Swift',
                      'Kotlin',
                      'Figma',
                      'AWS',
                      'Docker',
                    ].map((item) => (
                      <TagButton
                        key={item}
                        label={item}
                        selected={formData.techStacks.includes(item)}
                        onClick={() => toggleItem('techStacks', item)}
                        small
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="mt-12 flex gap-4">
            {currentStep > 1 && (
              <button
                onClick={prev}
                className="flex-1 p-4 text-slate-500 font-bold hover:text-white transition-all"
              >
                이전
              </button>
            )}
            <button
              onClick={currentStep === 6 ? handleComplete : next}
              disabled={isNextDisabled()}
              className={`flex-[2] py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                isNextDisabled()
                  ? 'bg-white/5 text-slate-700'
                  : 'bg-white text-slate-950 hover:bg-blue-400 active:scale-95 shadow-xl'
              }`}
            >
              {currentStep === 6 ? '가입 완료' : '다음 단계'}
              {currentStep < 6 && <ChevronRight size={18} />}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

// --- 하위 컴포넌트: 입력 필드 (Step 1용) ---
const InputField = React.forwardRef(
  ({ icon, isError, ...props }: any, ref: any) => (
    <div
      className={`relative flex items-center bg-white/5 border-2 rounded-2xl transition-all ${
        isError
          ? 'border-red-500/50 bg-red-500/5'
          : 'border-white/5 focus-within:border-blue-500'
      }`}
    >
      <div className={`pl-5 ${isError ? 'text-red-400' : 'text-slate-500'}`}>
        {icon}
      </div>
      <input
        ref={ref}
        {...props}
        className="w-full bg-transparent p-4 outline-none text-white font-bold placeholder:text-slate-700 text-sm"
      />
    </div>
  ),
);

// --- 태그 및 카드 컴포넌트는 이전과 동일 (생략 가능하나 일관성을 위해 유지) ---
function TagButton({ label, selected, onClick, small }: any) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 font-bold transition-all ${
        small ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'
      } ${
        selected
          ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
          : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
      }`}
    >
      {label}
    </button>
  );
}

function SelectionCard({ title, selected, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
        selected
          ? 'bg-blue-600/10 border-blue-500'
          : 'bg-white/5 border-white/5 hover:border-white/20'
      }`}
    >
      <span
        className={`font-black ${selected ? 'text-white' : 'text-slate-400'}`}
      >
        {title}
      </span>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? 'bg-blue-500 border-blue-400' : 'border-slate-700'
        }`}
      >
        {selected && <Check size={12} className="text-white" />}
      </div>
    </button>
  );
}
