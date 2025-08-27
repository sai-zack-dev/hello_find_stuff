import { useState, useCallback } from '@lynx-js/react'
import './App.css';
import HomeScreen from './screens/Home.tsx'
import ShopScreen from './screens/Shop.tsx'
import BottomTabBar from './components/BottomTabBar.tsx'

type TabKey = 'home' | 'shop' | 'inbox' | 'profile';

export function App(props: { onRender?: () => void }) {
  props.onRender?.();
  const [tab, setTab] = useState<TabKey>('home');
  const [showCreate, setShowCreate] = useState(false);

  const onPressPlus = useCallback(() => {
    setShowCreate(true);
  }, []);
  const Screen = {
    home: HomeScreen,
    shop: ShopScreen,
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
        onChangeTab={setTab}
      />
    </view>
  );
}
