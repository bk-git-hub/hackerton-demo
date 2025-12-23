import React, { createContext, useContext } from 'react';
import { useTinderSwipe } from './useTinderSwipe';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type TinderSwipeContextType = ReturnType<typeof useTinderSwipe> | null;

const TinderSwipeContext = createContext<TinderSwipeContextType>(null);

const useTinderContext = () => {
  const context = useContext(TinderSwipeContext);
  if (!context) {
    throw new Error(
      'Tinder.* components must be rendered within a Tinder.Root component.',
    );
  }

  return context;
};

interface TinderRootProps {
  cards: any[];
  children: React.ReactNode;
}

export const TinderRoot = ({ cards, children }: TinderRootProps) => {
  const swipeApi = useTinderSwipe({ itemCount: cards.length });

  return (
    <TinderSwipeContext.Provider value={swipeApi}>
      {children}
    </TinderSwipeContext.Provider>
  );
};

interface TinderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  children: React.ReactNode;
}

export const TinderCard = ({
  index,
  children,
  className,
  style,
  ...props
}: TinderCardProps) => {
  const {
    currentIndex,
    itemCount,
    topCardRef,
    nextCardRef,
    handlePointerDown,
    likeIndicatorRef,
    nopeIndicatorRef,
  } = useTinderContext();

  if (index < currentIndex || index > currentIndex + 2) return null;

  const isTopCard = index === currentIndex;
  const isNextCard = index === currentIndex + 1;

  return (
    <div
      ref={isTopCard ? topCardRef : isNextCard ? nextCardRef : null}
      onPointerDown={isTopCard ? handlePointerDown : undefined}
      className={twMerge(
        clsx(
          'absolute h-full w-full cursor-grab [touch-action:none] overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl transition-transform duration-300 ease-out select-none',
          className,
        ),
      )}
      style={{
        zIndex: itemCount - index,
        transform: isTopCard
          ? 'none'
          : `scale(${1 - (index - currentIndex) * 0.05}) translateY(${
              (index - currentIndex) * 15
            }px)`, // 뒤의 카드가 아래로 살짝 보이게 수정
        ...style,
      }}
      {...props}
    >
      {children}

      {/* --- Orbit 테마 인디케이터 (LIKE/NOPE) --- */}
      {isTopCard && (
        <>
          {/* LIKE (APPROVE) 인디케이터 */}
          <div
            ref={likeIndicatorRef}
            className="pointer-events-none absolute top-12 left-10 -rotate-12 transform opacity-0 z-50"
          >
            <div className="flex items-center gap-2 px-6 py-2 border-4 border-emerald-500 rounded-2xl bg-emerald-500/10 backdrop-blur-md">
              <span className="text-4xl font-black text-emerald-500 tracking-tighter italic uppercase">
                Approve
              </span>
            </div>
          </div>

          {/* NOPE (REJECT) 인디케이터 */}
          <div
            ref={nopeIndicatorRef}
            className="pointer-events-none absolute top-12 right-10 rotate-12 transform opacity-0 z-50"
          >
            <div className="flex items-center gap-2 px-6 py-2 border-4 border-rose-600 rounded-2xl bg-rose-600/10 backdrop-blur-md">
              <span className="text-4xl font-black text-rose-600 tracking-tighter italic uppercase">
                Reject
              </span>
            </div>
          </div>

          {/* 스캔 라인 오버레이 (디테일) */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%]" />
        </>
      )}
    </div>
  );
};

export const TinderNopeButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { animateSwipe, isFinished } = useTinderContext();
  if (isFinished) return null;
  return <button onClick={() => animateSwipe('left')} {...props} />;
};

export const TinderLikeButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { animateSwipe, isFinished } = useTinderContext();
  if (isFinished) return null;
  return <button onClick={() => animateSwipe('right')} {...props} />;
};

export const TinderEmptyFallback = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isFinished } = useTinderContext();

  // isFinished가 true일 때만 children을 렌더링
  return isFinished ? <div className={className}>{children}</div> : null;
};

export const TinderUndoButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { undo, currentIndex } = useTinderContext();
  // 첫 번째 카드이거나 애니메이션 중일 때는 비활성화
  const isDisabled = currentIndex === 0;
  return (
    <button
      onClick={undo}
      disabled={isDisabled}
      className={twMerge('...', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TinderResetButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { reset, currentIndex } = useTinderContext();
  const isDisabled = currentIndex === 0;
  return (
    <button
      onClick={reset}
      disabled={isDisabled}
      className={twMerge('...', className)}
      {...props}
    >
      {children}
    </button>
  );
};
