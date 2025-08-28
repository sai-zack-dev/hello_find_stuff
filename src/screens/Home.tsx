import { useCallback, useMemo, useRef, useState } from '@lynx-js/react';
import HomeTopNav from '../components/HomeTopNav.tsx';
import VideoOptionsModal from '../components/VideoOptionsModal.tsx';
import v1 from '../assets/Video_1.png';
import v2 from '../assets/Video_2.png';
import r1 from '../assets/result_1.png';
import r2 from '../assets/result_2.png';

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
  const [showModal, setShowModal] = useState(false);
  const currIndexRef = useRef(0);
  const snappingRef = useRef(false);
  const [scanState, setScanState] = useState<'idle' | 'animating' | 'result'>(
    'idle',
  ); // New state for scanning

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

  const handleFindStuff = () => {
    setShowModal(false);
    setScanState('animating');

    setTimeout(() => {
      setScanState('result');
    }, 1000);
  };

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
            {scanState === 'animating' && <view className="AnimationOverlay" />}
            {scanState === 'result' && (
              <>
                <text
                  className="CancelSearch"
                  bindtap={() => setScanState('idle')}
                >
                  Cancel Search
                </text>
                <view className='ShopItemOverlay'>
                  {/* these are shop items, click one of these redirect to shop with like this {result: 1, item: 1} there are 2 video/image so if v2 {result: 2, item: 1}. The index of top-left gonna be 1, index of top-right is 2, bottom-left index 3 and bottom-right 4. There are 4 items each for 2 video/image so total 8 items */}
                  <view className='ShopItem top-left' bindtap={()=> {}}/>
                  <view className='ShopItem top-right' bindtap={()=> {}}/>
                  <view className='ShopItem bottom-left' bindtap={()=> {}}/>
                  <view className='ShopItem bottom-right' bindtap={()=> {}}/>
                </view>
                <image className="Card FindResult" src={idx === 1 ? r2 : r1} />
                <view className="ResultOverlay" />
              </>
            )}
            <image className="Card" src={idx == 1 ? v2 : v1} />
          </view>
        ))}
      </scroll-view>
      <view className="TapOverlay">
        <view
          className="TapButton"
          bindtap={() => snapTo(currIndexRef.current - 1)}
        />
        <view className="TapButton" bindtap={onShowModal} />
        <view
          className="TapButton"
          bindtap={() => snapTo(currIndexRef.current + 1)}
        />
      </view>
      {showModal && (
        <VideoOptionsModal onClose={onCloseModal} findStuff={handleFindStuff} />
      )}
    </view>
  );
}
