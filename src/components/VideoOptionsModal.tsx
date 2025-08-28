import { useState, useEffect } from '@lynx-js/react';
import Icon from '../assets/search-white.png';

interface VideoOptionsModalProps {
  onClose: () => void;
  findStuff: () => void;
}

export default function VideoOptionsModal({
  onClose,
  findStuff,
}: VideoOptionsModalProps) {
  const [speed, setSpeed] = useState('1.0x');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <view>
      <view className={`ModalContent ${isMounted ? 'Active' : ''}`}>
        {/* Top Handle */}
        <view className="ModalHandle" />

        {/* Top Options */}
        <view className="OptionRow FindStuffBtn" bindtap={findStuff}>
          <text className="NewTag">New</text>
          <image src={Icon} className="Icon" />
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
      <view className="ModalOverlay"bindtap={onClose}/>
    </view>
  );
}
