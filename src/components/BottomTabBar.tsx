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
  shopEnabled?: boolean            // ⬅️ new prop
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
    const labelClass = [
      'tab-label',
      focused ? 'tab-label--active' : '',
      p.clickable === false ? 'tab-label--disabled' : ''
    ].filter(Boolean).join(' ')

    const iconSrc = focused && p.solidIcon ? p.solidIcon : p.regularIcon

    return (
      <view
        className='tab-item'
        {...(p.clickable ? { bindtap: onTap } : {})}
      >
        <image src={iconSrc} className='tab-icon' />
        <text className={labelClass}>{p.label}</text>
      </view>
    )
  }

  return (
    <view className='tab-bar'>
      <Item
        tab='home'
        label='Home'
        regularIcon={homeRegular}
        solidIcon={homeSolid}
        clickable
      />

      {/* Shop is clickable only after selection */}
      <Item
        tab='shop'
        label='Shop'
        regularIcon={shopRegular}
        solidIcon={shopSolid}
        clickable={!!props.shopEnabled}
      />

      <view className='plus-wrapper'>
        <view className='plus-btn'>
          <text className='plus-glyph'>＋</text>
        </view>
      </view>

      <Item tab='inbox' label='Inbox' regularIcon={inboxRegular} />
      <Item tab='profile' label='Profile' regularIcon={profileRegular} />
    </view>
  )
}
