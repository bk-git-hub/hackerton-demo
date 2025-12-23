import { Search, Filter, Users, Globe, Code2 } from 'lucide-react';

export default function ProjectList() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 좌측 필터 (다크 테마 최적화) */}
          <aside className="w-full lg:w-64 space-y-10">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
                <Filter size={16} /> Filter By Orbit
              </h3>
              <div className="space-y-3">
                {['AI & Data', 'Web3', 'E-Commerce', 'Mobile App'].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="block w-full text-left text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
                    >
                      {tag}
                    </button>
                  ),
                )}
              </div>
            </div>
          </aside>

          {/* 우측 공고 리스트 (카드 디자인) */}
          <main className="flex-1 space-y-8">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-black text-white">
                신규 프로젝트 궤도
              </h2>
              <div className="relative w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="아이디어 검색..."
                  className="w-full rounded-xl border border-white/5 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-950/50 p-8 transition-all hover:border-blue-500/30 hover:bg-slate-950"
                >
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                          <Code2 size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Docking Available
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        차세대 핀테크 모바일 앱 미션 #{i}
                      </h4>
                      <p className="max-w-xl text-slate-400 leading-relaxed">
                        사용자의 소비 패턴을 AI로 분석하여 가장 효율적인 자산
                        관리를 돕는 프로젝트입니다.
                      </p>
                    </div>
                    <a
                      href="/projects/123"
                      className="rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                    >
                      상세 보기
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
