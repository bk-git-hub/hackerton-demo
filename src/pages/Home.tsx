import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BORDER = "#4A90C2";

const Card = styled.div`
  border: 1px solid ${BORDER};
  border-radius: 18px;
  background: #ffffff;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.span`
  border: 1px solid ${BORDER};
  background: rgba(74, 144, 194, 0.12);
  color: #1f4e79;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid ${BORDER};
  background: rgba(74, 144, 194, 0.16);
  color: #1f2937;
  font-weight: 700;
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 9999px;
  text-decoration: none;

  &:hover {
    filter: brightness(0.98);
  }
`;

const OutlineButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid ${BORDER};
  background: #fff;
  color: #111827;
  font-weight: 700;
  font-size: 13px;
  padding: 8px 14px;
  border-radius: 9999px;
  text-decoration: none;

  &:hover {
    background: #f0f7fd;
  }
`;

export default function Home() {
  const quickCards = [
    {
      title: "메이트 찾기",
      desc: "같이 공부할 사람, 사이드 프로젝트 메이트를 찾아보세요.",
      badge: "추천",
      to: "#",
      icon: "🤝",
    },
    {
      title: "팀 만들기",
      desc: "역할별로 팀원을 모집하고 프로젝트를 시작해요.",
      badge: "모집",
      to: "#",
      icon: "👥",
    },
    {
      title: "이벤트",
      desc: "해커톤, 밋업, 스터디 이벤트를 한 번에 확인해요.",
      badge: "HOT",
      to: "#",
      icon: "🎉",
    },
  ];

  const sampleList = [
    {
      title: "프론트엔드 메이트 구해요",
      meta: "React · TypeScript · 주 2회",
      tag: "메이트",
    },
    {
      title: "해커톤 팀원 모집 (디자이너/백엔드)",
      meta: "기간 2주 · 온라인/오프라인 혼합",
      tag: "팀",
    },
    {
      title: "스터디: 알고리즘 주 3회",
      meta: "백준 · 난이도 실버~골드",
      tag: "스터디",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-[1200px] px-4 py-8">
        {/* 상단 히어로 */}
        <Card className="p-7">
          <CardHeader>
            <div>
              <h1 className="text-[24px] font-extrabold text-gray-900">
                beginmate에서 함께 시작해요
              </h1>
              <p className="mt-2 text-[14px] text-gray-600 leading-6">
                메이트 찾기 · 팀 만들기 · 이벤트 참여까지 한 곳에서.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <OutlineButton to="/setting">내 프로필</OutlineButton>
              <PrimaryButton to="#">추천 받기</PrimaryButton>
            </div>
          </CardHeader>

          {/* 검색바 */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                className="
                  w-full rounded-xl bg-white px-4 py-3 text-[14px]
                  border border-[#4A90C2]
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#4A90C233]
                "
                placeholder="예: React 스터디, 해커톤 팀원, 백엔드 메이트"
              />
              <button
                type="button"
                className="
                  rounded-xl px-5 py-3 text-[13px] font-bold
                  border border-[#4A90C2]
                  bg-[#4A90C222] text-gray-900
                  hover:brightness-[0.98]
                "
              >
                검색
              </button>
            </div>

            {/* 필터 칩 */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["메이트", "팀", "이벤트", "스터디", "온라인", "오프라인"].map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    className="
                      rounded-full px-3 py-1 text-[12px] font-semibold
                      border border-[#4A90C2]
                      bg-white text-gray-700
                      hover:bg-[#4A90C211]
                    "
                  >
                    {t}
                  </button>
                )
              )}
            </div>
          </div>
        </Card>

        {/* 퀵 액션 카드 3개 */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickCards.map((c) => (
            <Card key={c.title} className="p-6">
              <div className="flex items-start justify-between">
                <div className="text-[28px]">{c.icon}</div>
                <Badge>{c.badge}</Badge>
              </div>
              <div className="mt-3 text-[16px] font-extrabold text-gray-900">
                {c.title}
              </div>
              <div className="mt-2 text-[13px] text-gray-600 leading-6">
                {c.desc}
              </div>
              <div className="mt-5">
                <PrimaryButton to={c.to}>바로가기</PrimaryButton>
              </div>
            </Card>
          ))}
        </div>

        {/* 추천 리스트 + 우측 위젯 */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 리스트 */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-[16px] font-extrabold text-gray-900">
                오늘의 추천
              </div>
              <Link
                to="#"
                className="text-[13px] font-semibold text-[#1F4E79] hover:underline"
              >
                더 보기
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {sampleList.map((item) => (
                <div
                  key={item.title}
                  className="
                    rounded-xl border border-[#4A90C2]
                    bg-white p-4
                    hover:bg-[#F0F7FD]
                    transition
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[14px] font-bold text-gray-900">
                      {item.title}
                    </div>
                    <Badge>{item.tag}</Badge>
                  </div>
                  <div className="mt-2 text-[13px] text-gray-600">
                    {item.meta}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 우측 위젯 */}
          <Card className="p-6">
            <div className="text-[16px] font-extrabold text-gray-900">
              내 활동 요약
            </div>

            <div className="mt-4 space-y-3 text-[13px] text-gray-700">
              <div className="flex items-center justify-between">
                <span>찜한 메이트</span>
                <span className="font-bold text-[#1F4E79]">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span>참여 중 이벤트</span>
                <span className="font-bold text-[#1F4E79]">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>진행 중 팀</span>
                <span className="font-bold text-[#1F4E79]">0</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <OutlineButton to="/setting">프로필 수정</OutlineButton>
              <PrimaryButton to="#">매칭 설정</PrimaryButton>
            </div>

            <div className="mt-6 rounded-xl border border-[#4A90C2] bg-[#F0F7FD] p-4">
              <div className="text-[13px] font-bold text-gray-900">
                빠른 추천 팁
              </div>
              <div className="mt-2 text-[12px] text-gray-600 leading-5">
                계정 설정에서 기술 스택/연락 가능 시간대를 채우면 추천 정확도가
                올라가요.
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
