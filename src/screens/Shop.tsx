import { useState, useEffect, useMemo } from '@lynx-js/react';
import '../style/Shop.css';
import Icon from '../assets/search-white.png';

// Helper to build asset path for tabs (result images)
function getResultImage(result: number, item: number) {
  return require(`../assets/results/result_item_${result}${item}.png`);
}

// Helper to build asset path for shopping list (product images)
function getProductImage(result: number, item: number, index: number) {
  return require(`../assets/products/result_${result}${item}_${index}.png`);
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

  // Tabs for this result (static values 1, 2, 3, 4)
  const tabs = [1, 2, 3, 4];

  // Get shopping items dynamically based on selected result
  const getShoppingItems = (result: number, item: number) => {
    const itemCount = 4; // Max of 4 items per result tab
    const items = [];
    for (let i = 1; i <= itemCount; i++) {
      try {
        // Check if image exists
        require(`../assets/products/result_${result}${item}_${i}.png`);
        items.push(i);
      } catch (e) {
        break;
      }
    }
    return items;
  };

  const shoppingItems = useMemo(
    () => getShoppingItems(result, activeItem),
    [result, activeItem],
  );

  return (
    <view className="shop-screen">
      {/* Tab for selecting result items */}
      <view className="option-row findstuff-btn">
        <image src={Icon} className="icon" />
        <text className="option-text">
          Hello Find Stuff - AI Search Results
        </text>
      </view>

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

      <text className="shopping-title">
        Showing results for: result_item_{result}
        {activeItem}
      </text>

      {/* Shopping results list */}
      <list
        className="shopping-results-list"
        list-type="waterfall"
        column-count={2}
        scroll-orientation="vertical"
      >
        {shoppingItems.map((itemIndex) => (
          <list-item
            key={String(itemIndex)} // Convert to string
            item-key={String(itemIndex)} // Convert to string
            // estimated-main-axis-size-px={200}
          >
            <view className="shopping-item">
              <view className='shopping-image-wrap'>
                <image
                  src={getProductImage(result, activeItem, itemIndex)}
                  className="shopping-item-image"
                />
              </view>
              <text className="item-label">
                Item {result}
                {activeItem}
                {itemIndex}
              </text>
            </view>
          </list-item>
        ))}
      </list>
    </view>
  );
}
