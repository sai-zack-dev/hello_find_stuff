import { useCallback } from '@lynx-js/react'

import homeRegular from '../assets/home-regular.png'
import homeSolid from '../assets/home-solid.png'
import shopRegular from '../assets/shop-regular.png'
import shopSolid from '../assets/shop-solid.png'

import inboxRegular from '../assets/inbox-regular.png'
import profileRegular from '../assets/profile-regular.png'

type TabKey = 'home' | 'shop' | 'inbox' | 'profile'

export default function BottomTabBar(props: {
  currentTab: TabKey
  onChangeTab: (tab: TabKey) => void
}) {
  const Item = (p: {
    tab: TabKey
    label: string
    regularIcon: string
    solidIcon?: string
    clickable?: boolean
  }) => {
    const onTap = useCallback(() => {
      if (p.clickable) props.onChangeTab(p.tab)
    }, [p.tab, p.clickable])

    const focused = props.currentTab === p.tab
    const labelClass = focused ? 'TabLabel TabLabel--active' : 'TabLabel'

    const iconSrc =
      focused && p.solidIcon ? p.solidIcon : p.regularIcon

    return (
      <view
        className='TabItem'
        {...(p.clickable ? { bindtap: onTap } : {})}
      >
        <image src={iconSrc} className='TabIcon' />
        <text className={labelClass}>{p.label}</text>
      </view>
    )
  }

  return (
    <view className='TabBar'>
      <Item
        tab='home'
        label='Home'
        regularIcon={homeRegular}
        solidIcon={homeSolid}
        clickable
      />
      <Item
        tab='shop'
        label='Shop'
        regularIcon={shopRegular}
        solidIcon={shopSolid}
      />

      <view className='PlusWrapper'>
        <view className='PlusButton'>
          <text className='PlusGlyph'>＋</text>
        </view>
      </view>

      <Item tab='inbox' label='Inbox' regularIcon={inboxRegular} />
      <Item tab='profile' label='Profile' regularIcon={profileRegular} />
    </view>
  )
}
