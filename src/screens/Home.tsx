// src/screens/HomeScreen.tsx
import { useCallback, useMemo, useRef, useState } from '@lynx-js/react';
import HomeTopNav from '../components/HomeTopNav.tsx';
import VideoOptionsModal from '../components/VideoOptionsModal.tsx';

declare const lynx: {
  createSelectorQuery: () => {
    select: (sel: string) => {
      invoke: (args: {
        method: 'scrollTo';
        params: { index?: number; offset?: number; smooth?: boolean };
      }) => any;
    };
    exec: () => void;
  };
};

export default function HomeScreen() {
  const items = useMemo(() => Array.from({ length: 2 }), []);
  const [showModal, setShowModal] = useState(false); // New state to control modal visibility
  const currIndexRef = useRef(0);
  const snappingRef = useRef(false);

  const snapTo = useCallback(
    (idx: number) => {
      const max = items.length - 1;
      const target = Math.max(0, Math.min(max, idx));
      if (target === currIndexRef.current) return;
      snappingRef.current = true;
      currIndexRef.current = target;

      lynx
        .createSelectorQuery()
        .select('#feed')
        .invoke({ method: 'scrollTo', params: { index: target, smooth: true } })
        .exec();

      setTimeout(() => {
        snappingRef.current = false;
      }, 80);
    },
    [items.length],
  );

  const onScrollEnd = useCallback(
    (e: any) => {
      const { scrollTop = 0, scrollHeight = 0 } = e?.detail || {};
      if (!scrollHeight || !items.length) return;
      const pageH = scrollHeight / items.length;
      const nearest = Math.round(scrollTop / pageH);
      currIndexRef.current = Math.max(0, Math.min(items.length - 1, nearest));
    },
    [items.length],
  );

  const onShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <view className="FeedWrap">
      <scroll-view
        id="feed"
        className="Feed"
        scroll-orientation="vertical"
        enable-scroll={true}
        bounces={false}
        scroll-bar-enable={false}
        bindscrollend={onScrollEnd}
      >
        <HomeTopNav />
        {items.map((_, idx) => (
          <view key={idx} className="SnapItem">
            <view className="Card">
              <text className="CardTitle">
                Video {idx + 1}{' '}{showModal}
              </text>
            </view>
          </view>
        ))}
      </scroll-view>
      {/* 3 stacked transparent buttons */}
      <view className="TapOverlay">
        <view
          className="TapButton"
          bindtap={() => snapTo(currIndexRef.current - 1)}
        />
        <view className="TapButton tap-mid" bindtap={onShowModal} />
        <view
          className="TapButton"
          bindtap={() => snapTo(currIndexRef.current + 1)}
        />
      </view>
      {showModal && <VideoOptionsModal onClose={onCloseModal} />}
    </view>
  );
}
