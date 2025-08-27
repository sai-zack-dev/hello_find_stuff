import searchIcon from '../assets/faSearch.png';

export default function HomeTopNav() {
  return (
    <view className="NavBar">
      <text className="NavBarItem">Live</text>
      <view className="NavBarCenter">
        <text>Following</text>
        <text>Friends</text>
        <text className="NavBarItem">For You</text>
      </view>
      <image src={searchIcon} className="SearchImage" />
    </view>
  );
}
