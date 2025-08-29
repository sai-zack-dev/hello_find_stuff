import { useState, useCallback } from '@lynx-js/react'
import './App.css';
import HomeScreen from './screens/Home.tsx'
import ShopScreen from './screens/Shop.tsx'
import BottomTabBar from './components/BottomTabBar.tsx'

type TabKey = 'home' | 'shop' | 'inbox' | 'profile';

export function App(props: { onRender?: () => void }) {
  props.onRender?.();

  const [tab, setTab] = useState<TabKey>('home');

  // ⬇️ Keep track of the selected shop result/item
  const [shopSelection, setShopSelection] = useState<{ result: number; item: number } | null>(null);

  // ⬇️ Only allow switching to 'shop' if we have a selection
  const onChangeTab = useCallback((next: TabKey) => {
    if (next === 'shop' && !shopSelection) return;
    setTab(next);
  }, [shopSelection]);

  // ⬇️ Called by Home when a user taps a ShopItem
  const handleSelectShopItem = useCallback((result: number, item: number) => {
    setShopSelection({ result, item });
    setTab('shop');
  }, []);

  const Screen = {
    home: () => <HomeScreen onSelectResult={handleSelectShopItem} />,
    shop: () => <ShopScreen result={shopSelection?.result} item={shopSelection?.item} />,
    inbox: () => <text>Inbox Screen (not implemented)</text>,
    profile: () => <text>Profile Screen (not implemented)</text>,
  }[tab];

  return (
    <view className="Root">
      <view className="Content">
        <Screen />
      </view>

      <BottomTabBar
        currentTab={tab}
        onChangeTab={onChangeTab}
        shopEnabled={!!shopSelection}   // ⬅️ tell the tab bar whether Shop is enabled
      />
    </view>
  );
}
