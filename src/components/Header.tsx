import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#4a90c2]">
      <div className="mx-auto max-w-[1200px] h-[72px] px-6 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-[22px] font-extrabold text-black">
          connecta
        </Link>

        {/* 메뉴 */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-black">
          <a href="#" className="hover:opacity-80">
            메이트
          </a>
          <a href="#" className="hover:opacity-80">
            팀
          </a>
          <a href="#" className="hover:opacity-80">
            이벤트
          </a>
          <a href="#" className="hover:opacity-80">
            매거진
          </a>
          <a href="#" className="hover:opacity-80">
            닥터B
          </a>
          <a href="#" className="hover:opacity-80">
            마켓
          </a>
        </nav>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white/50 grid place-items-center"
            title="채팅"
          >
            💬
          </button>

          <Link
            to="/setting"
            className="h-10 w-10 rounded-full bg-white grid place-items-center"
            title="마이페이지"
          >
            👤
          </Link>
        </div>
      </div>
    </header>
  );
}
