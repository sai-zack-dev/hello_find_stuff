import { useCallback, useMemo, useRef, useState } from '@lynx-js/react';
import HomeTopNav from '../components/HomeTopNav.tsx';
import VideoOptionsModal from '../components/VideoOptionsModal.tsx';
import v1 from '../assets/Video_1.png';
import v2 from '../assets/Video_2.png';
import r1 from '../assets/result_1.png';
import r2 from '../assets/result_2.png';
import '../style/Home.css';

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

export default function HomeScreen(props: {
  onSelectResult: (result: number, item: number) => void;
}) {
  const items = useMemo(() => Array.from({ length: 2 }), []);
  const [showModal, setShowModal] = useState(false);
  const currIndexRef = useRef(0);
  const snappingRef = useRef(false);
  const [scanState, setScanState] = useState<'idle' | 'animating' | 'result'>('idle');
  const [visibleIdx, setVisibleIdx] = useState(0);

  const snapTo = useCallback((idx: number) => {
    const max = items.length - 1;
    const target = Math.max(0, Math.min(max, idx));
    if (target === currIndexRef.current) return;
    snappingRef.current = true;
    currIndexRef.current = target;
    setVisibleIdx(target);

    lynx.createSelectorQuery()
      .select('#feed')
      .invoke({ method: 'scrollTo', params: { index: target, smooth: true } })
      .exec();

    setTimeout(() => { snappingRef.current = false; }, 80);
  }, [items.length]);

  const onScrollEnd = useCallback((e: any) => {
    const { scrollTop = 0, scrollHeight = 0 } = e?.detail || {};
    if (!scrollHeight || !items.length) return;
    const pageH = scrollHeight / items.length;
    const nearest = Math.round(scrollTop / pageH);
    const clamped = Math.max(0, Math.min(items.length - 1, nearest));
    currIndexRef.current = clamped;
    setVisibleIdx(clamped);
  }, [items.length]);

  const onShowModal = useCallback(() => setShowModal(true), []);
  const onCloseModal = useCallback(() => setShowModal(false), []);

  const handleFindStuff = () => {
    setShowModal(false);
    setScanState('animating');
    setTimeout(() => setScanState('result'), 1000);
  };

  const selectItem = useCallback((videoIdx: number, itemIdx: number) => {
    props.onSelectResult(videoIdx + 1, itemIdx);
  }, [props]);

  return (
    <view>
      <scroll-view
        id="feed"
        className="feed"
        scroll-orientation="vertical"
        enable-scroll={true}
        bounces={false}
        scroll-bar-enable={false}
        bindscrollend={onScrollEnd}
      >
        <HomeTopNav />
        {items.map((_, idx) => (
          <view key={idx} className="snap-item">
            <image className="card" src={idx === 1 ? v2 : v1} />
          </view>
        ))}
      </scroll-view>

      {/* overlays go OUTSIDE the SnapItems */}
      {scanState === 'animating' && (
        <view className="animation-overlay" />
      )}

      {scanState === 'result' && (
        <view className="result-wrap">
          <text className="cancel-search" bindtap={() => setScanState('idle')}>
            Cancel Search
          </text>

          <view className="result-item-overlay">
            <view className="result-item top-left"     bindtap={() => selectItem(currIndexRef.current, 1)} />
            <view className="result-item top-right"    bindtap={() => selectItem(currIndexRef.current, 2)} />
            <view className="result-item bottom-left"  bindtap={() => selectItem(currIndexRef.current, 3)} />
            <view className="result-item bottom-right" bindtap={() => selectItem(currIndexRef.current, 4)} />
          </view>

          <image className="find-result" src={currIndexRef.current === 1 ? r2 : r1} />
        </view>
      )}

      <view className="tap-overlay">
        <view className="tap-btn" bindtap={() => snapTo(currIndexRef.current - 1)} />
        <view className="tap-btn" bindtap={onShowModal} />
        <view className="tap-btn" bindtap={() => snapTo(currIndexRef.current + 1)} />
      </view>

      {showModal && (
        <VideoOptionsModal onClose={onCloseModal} findStuff={handleFindStuff} />
      )}
    </view>
  );
}
