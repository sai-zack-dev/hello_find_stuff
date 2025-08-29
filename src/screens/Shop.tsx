export default function ShopScreen(props: { result?: number; item?: number }) {
  return (
    <view className="ShopScreen">
      <text className="temp">
        {props.result && props.item
          ? `Result: ${props.result}, Item: ${props.item}`
          : 'No selection yet'}
      </text>
    </view>
  );
}
