import { useState, useEffect } from '@lynx-js/react';
import Icon from "../assets/search-white.png"

interface VideoOptionsModalProps {
  onClose: () => void;
}

export default function VideoOptionsModal({ onClose }: VideoOptionsModalProps) {
  const [speed, setSpeed] = useState('1.0x');
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to trigger the transition after the component mounts
  useEffect(() => {
    // A small delay (e.g., 10ms) is often needed to ensure the
    // browser has had a chance to render the initial state.
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <view className="ModalOverlay" bindtap={onClose}>
      <view
        className={`ModalContent ${isMounted ? 'Active' : ''}`}
        bindtap={(e) => e.stopPropagation()}
      >
        {/* Top Handle */}
        <view className="ModalHandle" />

        {/* Top Options */}
        <view className="OptionRow FindStuffBtn">
            <text className='NewTag'>New</text>
          <image src={Icon} className="Icon"  />
          <text className="OptionText">Find Stuff</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Not interested</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Report</text>
        </view>

        {/* Middle Section */}
        <view className="SectionDivider" />
        <view className="OptionRow">
          <text className="OptionText">Speed</text>
          <view className="SpeedOptions">
            {['0.5x', '1.0x', '1.5x', '2.0x'].map((s) => (
              <text
                key={s}
                className={`SpeedText ${speed === s ? 'Active' : ''}`}
              >
                {s}
              </text>
            ))}
          </view>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Clear display</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Auto scroll</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Captions and translation</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Picture-in-picture</text>
        </view>
        <view className="OptionRow">
          <text className="OptionText">Background audio</text>
        </view>
        {/* Add the rest of the options here... */}

        {/* Bottom Section */}
        <view className="SectionDivider" />
        <view className="OptionRow">
          <text className="OptionText">Why this video</text>
        </view>
      </view>
    </view>
  );
}
