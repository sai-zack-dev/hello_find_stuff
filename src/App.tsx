import { useState, useCallback } from '@lynx-js/react';
import './style/App.css';
import './style/Shop.css';
import HomeScreen from './screens/Home.tsx';
import ShopScreen from './screens/Shop.tsx';
import BottomTabBar from './components/BottomTabBar.tsx';

type TabKey = 'home' | 'shop' | 'inbox' | 'profile';

export function App(props: { onRender?: () => void }) {
  props.onRender?.();

  const [tab, setTab] = useState<TabKey>('home');

  const [shopSelection, setShopSelection] = useState<{
    result: number;
    item: number;
  } | null>(null);

  const onChangeTab = useCallback(
    (next: TabKey) => {
      if (next === 'shop' && !shopSelection) return;
      setTab(next);
    },
    [shopSelection],
  );

  const handleSelectShopItem = useCallback((result: number, item: number) => {
    setShopSelection({ result, item });
    setTab('shop');
  }, []);

  const Screen = {
    home: () => <HomeScreen onSelectResult={handleSelectShopItem} />,
    shop: () => (
      <ShopScreen result={shopSelection?.result} item={shopSelection?.item} />
    ),
    inbox: () => <text>Inbox Screen (not implemented)</text>,
    profile: () => <text>Profile Screen (not implemented)</text>,
  }[tab];

  return (
    <view className="root">
      <view>
        <Screen />
      </view>

      <BottomTabBar
        currentTab={tab}
        onChangeTab={onChangeTab}
        shopEnabled={!!shopSelection}
      />
    </view>
  );
}
