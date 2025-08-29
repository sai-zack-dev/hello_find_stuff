import searchIcon from '../assets/faSearch.png';

export default function HomeTopNav() {
  return (
    <view className="navbar">
      <text>Live</text>
      <view className="navbar-center">
        <text>Following</text>
        <text>Friends</text>
        <text className="navbar-item">For You</text>
      </view>
      <image src={searchIcon} className="search-img" />
    </view>
  );
}
