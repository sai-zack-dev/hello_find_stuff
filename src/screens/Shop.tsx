import { useState, useEffect } from '@lynx-js/react';
import '../style/Shop.css';
import Icon from '../assets/search-white.png';

// helper to build asset path
function getResultImage(result: number, item: number) {
  return require(`../assets/results/result_item_${result}${item}.png`);
}

export default function ShopScreen(props: { result?: number; item?: number }) {
  const { result, item } = props;

  const [activeItem, setActiveItem] = useState<number>(item || 1);

  useEffect(() => {
    if (item) setActiveItem(item);
  }, [item]);

  if (!result) {
    return (
      <view className="shop-screen">
        <text className="shop-empty-text">No selection yet</text>
      </view>
    );
  }

  // 4 tabs for this result
  const tabs = [1, 2, 3, 4];

  return (
    <view className="shop-screen">
      <view className="option-row findstuff-btn">
        {/* Result: {result}, Item: {activeItem} */}
        <image src={Icon} className="icon" />
        <text className="option-text">
          Hello Find Stuff - AI Search Results
        </text>
      </view>

      {/* tab row */}
      <view className="result-item-wrap">
        {tabs.map((tab) => {
          const imgSrc = getResultImage(result, tab);
          const isActive = activeItem === tab;
          return (
            <image
              key={`tab-${tab}`}
              className={`result-item-tab ${isActive ? 'active' : ''}`}
              src={imgSrc}
              bindtap={() => setActiveItem(tab)}
            />
          );
        })}
      </view>

      {/* below show shopping items for the active tab */}
      <text className="shopping-title">
        Showing results for: result_item_{result}
        {activeItem}
      </text>
      <scroll-view scroll-orientation="vertical" className="shopping-results-wrap">
        {/* You can later replace this with a list of related shop items */}
        <view className='shopping-results'>
          <view className="shopping-item">Shop Item 1</view>
          <view className="shopping-item">Shop Item 2</view>
          <view className="shopping-item">Shop Item 3</view>
          <view className="shopping-item">Shop Item 4</view>
          <view className="shopping-item">Shop Item 5</view>
          <view className="shopping-item">Shop Item 6</view>
          <view className="shopping-item">Shop Item 7</view>
          <view className="shopping-item">Shop Item 8</view>
          <view className="shopping-item">Shop Item 9</view>
        </view>
      </scroll-view>
    </view>
  );
}
