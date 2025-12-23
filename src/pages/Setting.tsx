import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

/* ================= styled-components ================= */

const PrimaryButton = styled.button`
  background: #4a90c266;
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #4a90c2;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }
`;

const OutlineButton = styled.button`
  background: white;
  color: #111827;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #4a90c2;
  cursor: pointer;

  &:hover {
    background: #f0f7fd;
  }
`;

const DangerButton = styled.button`
  background: #fef2f2;
  color: #b91c1c;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #b91c1c;
  cursor: pointer;

  &:hover {
    background: #fee2e2;
  }
`;

/* ================= 공통 UI ================= */

const SectionTitle = ({ children }) => (
  <div className="text-[18px] font-bold text-gray-900">{children}</div>
);

const FieldLabel = ({ children }) => (
  <div className="text-[12px] font-semibold text-gray-700 mb-1">{children}</div>
);

const Input = (props) => (
  <input
    {...props}
    className="
      w-full rounded-md
      border border-[#4A90C2]
      bg-white px-3 py-2 text-[14px]
      placeholder:text-gray-400
      focus:outline-none
      focus:border-[#4A90C2]
      focus:ring-2 focus:ring-[#4A90C233]
    "
  />
);

const Divider = () => <div className="h-px w-full bg-[#4A90C233] my-10" />;

/* ================= 옵션 ================= */

const TECH_OPTIONS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Tailwind CSS",
  "styled-components",
  "Node.js",
  "Spring",
  "Spring Boot",
  "Express",
  "NestJS",
  "React Native",
  "Flutter",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "AWS",
  "Git",
  "GitHub",
  "Figma",
];

const TIME_OPTIONS = [
  "평일 오전 (09-12)",
  "평일 오후 (12-18)",
  "평일 저녁 (18-22)",
  "주말 오전 (09-12)",
  "주말 오후 (12-18)",
  "주말 저녁 (18-22)",
];

const POSITION_OPTIONS = ["프론트엔드", "백엔드", "AI"];

const STORAGE_KEY = "connecta_account_settings_v1";

/* ================= 메인 ================= */

export default function Setting() {
  const menuSections = useMemo(
    () => [
      { title: "회원", items: ["계정", "일정", "관심", "메시지"] },
      { title: "활동", items: ["내 팀", "새 팀 등록"] },
    ],
    []
  );

  const [active, setActive] = useState("계정");

  const [form, setForm] = useState({
    firstName: "",
    major: "",
    nickName: "",
    email: "",
    intro: "",
  });

  const [techStacks, setTechStacks] = useState(["React"]);
  const [contactTimes, setContactTimes] = useState([]);
  const [positions, setPositions] = useState([]);

  const toggleValue = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const [pw, setPw] = useState({
    current: "",
    next: "",
    nextConfirm: "",
  });

  const [deleteEmail, setDeleteEmail] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      if (parsed?.form) setForm(parsed.form);
      if (Array.isArray(parsed?.techStacks)) setTechStacks(parsed.techStacks);
      if (Array.isArray(parsed?.contactTimes))
        setContactTimes(parsed.contactTimes);
      if (Array.isArray(parsed?.positions)) setPositions(parsed.positions);
    } catch (e) {
      console.log("load settings error:", e);
    }
  }, []);

  const onSaveProfile = () => {
    const payload = {
      form,
      techStacks,
      contactTimes,
      positions,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      alert("저장되었습니다.");
    } catch (e) {
      console.log("save settings error:", e);
      alert("저장에 실패했습니다.");
    }
  };

  const onChangePassword = () => {
    if (!pw.current || !pw.next || !pw.nextConfirm) {
      alert("비밀번호를 모두 입력해 주세요.");
      return;
    }
    if (pw.next !== pw.nextConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("비밀번호 변경 완료(예시)");
    setPw({ current: "", next: "", nextConfirm: "" });
  };

  const onDeleteAccount = () => {
    if (!deleteEmail.trim()) {
      alert("이메일 주소를 입력해 주세요.");
      return;
    }
    if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
      alert("계정 삭제 처리(예시)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-[260px] shrink-0">
            <div className="rounded-xl border border-[#4A90C2] bg-white p-4">
              {menuSections.map((sec) => (
                <div key={sec.title} className="mb-2">
                  <div className="px-2 py-2 text-[13px] font-bold text-gray-900">
                    {sec.title}
                  </div>
                  {sec.items.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActive(label)}
                      className={`w-full text-left px-3 py-2 rounded-md text-[13px]
                        ${
                          active === label
                            ? "bg-[#4A90C222] text-[#1F4E79] font-bold"
                            : "text-gray-700 hover:bg-[#4A90C211]"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          <section className="flex-1">
            <div className="rounded-2xl border border-[#4A90C2] bg-white p-8">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle>계정</SectionTitle>
                <PrimaryButton type="button" onClick={onSaveProfile}>
                  저장
                </PrimaryButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <FieldLabel>이름</FieldLabel>
                  <Input
                    value={form.firstName}
                    placeholder="이름을 입력해 주세요"
                    onChange={(e) =>
                      setForm((p) => ({ ...p, firstName: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <FieldLabel>전공</FieldLabel>
                  <Input
                    value={form.major}
                    placeholder="전공을 입력해 주세요"
                    onChange={(e) =>
                      setForm((p) => ({ ...p, major: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <FieldLabel>깃허브 아이디</FieldLabel>
                  <Input
                    value={form.nickName}
                    placeholder="깃허브 아이디를 입력해 주세요"
                    onChange={(e) =>
                      setForm((p) => ({ ...p, nickName: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <FieldLabel>이메일</FieldLabel>
                  <Input
                    type="email"
                    value={form.email}
                    placeholder="이메일을 입력해 주세요"
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <FieldLabel>한 줄 소개</FieldLabel>
                  <Input
                    value={form.intro}
                    placeholder="한 줄 소개를 입력해 주세요"
                    onChange={(e) =>
                      setForm((p) => ({ ...p, intro: e.target.value }))
                    }
                  />
                </div>
              </div>

              <Divider />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <FieldLabel>기술 스택</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {TECH_OPTIONS.map((tech) => {
                      const isActive = techStacks.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() =>
                            toggleValue(tech, techStacks, setTechStacks)
                          }
                          className={`rounded-full px-3 py-1 text-[12px] font-semibold border border-[#4A90C2]
                            ${
                              isActive
                                ? "bg-[#4A90C266] text-[#1F4E79]"
                                : "bg-white text-gray-700 hover:bg-[#4A90C211]"
                            }`}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <FieldLabel>연락 가능한 시간대</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {TIME_OPTIONS.map((time) => {
                      const isActive = contactTimes.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            toggleValue(time, contactTimes, setContactTimes)
                          }
                          className={`rounded-full px-3 py-1 text-[12px] font-semibold border border-[#4A90C2]
                            ${
                              isActive
                                ? "bg-[#4A90C266] text-[#1F4E79]"
                                : "bg-white text-gray-700 hover:bg-[#4A90C211]"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5">
                    <FieldLabel>포지션</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {POSITION_OPTIONS.map((pos) => {
                        const isActive = positions.includes(pos);
                        return (
                          <button
                            key={pos}
                            type="button"
                            onClick={() =>
                              toggleValue(pos, positions, setPositions)
                            }
                            className={`rounded-full px-3 py-1 text-[12px] font-semibold border border-[#4A90C2]
                              ${
                                isActive
                                  ? "bg-[#4A90C266] text-[#1F4E79]"
                                  : "bg-white text-gray-700 hover:bg-[#4A90C211]"
                              }`}
                          >
                            {pos}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              <SectionTitle>비밀번호 변경</SectionTitle>

              <div className="grid grid-cols-12 gap-5 mt-4">
                <div className="col-span-12">
                  <FieldLabel>현재 비밀번호</FieldLabel>
                  <Input
                    type="password"
                    value={pw.current}
                    placeholder="현재 비밀번호를 입력해 주세요"
                    onChange={(e) =>
                      setPw((p) => ({ ...p, current: e.target.value }))
                    }
                  />
                </div>

                <div className="col-span-12 md:col-span-5">
                  <FieldLabel>새 비밀번호</FieldLabel>
                  <Input
                    type="password"
                    value={pw.next}
                    placeholder="새 비밀번호를 입력해 주세요"
                    onChange={(e) =>
                      setPw((p) => ({ ...p, next: e.target.value }))
                    }
                  />
                </div>

                <div className="col-span-12 md:col-span-5">
                  <FieldLabel>새 비밀번호 확인</FieldLabel>
                  <Input
                    type="password"
                    value={pw.nextConfirm}
                    placeholder="새 비밀번호를 다시 입력해 주세요"
                    onChange={(e) =>
                      setPw((p) => ({ ...p, nextConfirm: e.target.value }))
                    }
                  />
                </div>

                <div className="col-span-12 md:col-span-2 flex md:items-end">
                  <PrimaryButton type="button" onClick={onChangePassword}>
                    변경
                  </PrimaryButton>
                </div>
              </div>

              <Divider />

              <SectionTitle>계정 삭제</SectionTitle>

              <div className="mt-4">
                <Input
                  placeholder="이메일 주소를 입력해 주세요"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                />
              </div>

              <div className="mt-4 rounded-xl border border-[#4A90C2] bg-[#F0F7FD] p-5 text-[13px] text-[#1F4E79] leading-6">
                <div className="font-bold mb-2">계정을 삭제하는 경우,</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>이 계정을 더 이상 사용할 수 없게 됩니다.</li>
                  <li>계정과 관계된 모든 정보가 삭제됩니다.</li>
                </ul>
                <div className="mt-3 font-semibold text-red-600">
                  정말로 계정을 삭제하고 싶다면, 이메일 주소를 입력해주세요.
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <DangerButton type="button" onClick={onDeleteAccount}>
                  삭제
                </DangerButton>
                <OutlineButton
                  type="button"
                  onClick={() => setDeleteEmail("")}
                >
                  취소
                </OutlineButton>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
