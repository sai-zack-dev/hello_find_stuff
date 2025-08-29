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
      <view className={`modal-content ${isMounted ? 'active' : ''}`}>
        {/* Top Handle */}
        <view className="modal-handle" />

        {/* Top Options */}
        <view className="option-row findstuff-btn" bindtap={findStuff}>
          <text className="new-tag">New</text>
          <image src={Icon} className="icon" />
          <text className="option-text">Find Stuff</text>
        </view>
        <view className="option-row">
          <text className="option-text">Not interested</text>
        </view>
        <view className="option-row">
          <text className="option-text">Report</text>
        </view>

        {/* Middle Section */}
        <view className="section-divider" />
        <view className="option-row">
          <text className="option-text">Speed</text>
          <view className="speed-options">
            {['0.5x', '1.0x', '1.5x', '2.0x'].map((s) => (
              <text
                key={s}
                className={`speed-text ${speed === s ? 'active' : ''}`}
              >
                {s}
              </text>
            ))}
          </view>
        </view>
        <view className="option-row">
          <text className="option-text">Clear display</text>
        </view>
        <view className="option-row">
          <text className="option-text">Auto scroll</text>
        </view>
        <view className="option-row">
          <text className="option-text">Captions and translation</text>
        </view>
        <view className="option-row">
          <text className="option-text">Picture-in-picture</text>
        </view>
        <view className="option-row">
          <text className="option-text">Background audio</text>
        </view>
        {/* Add the rest of the options here... */}

        {/* Bottom Section */}
        <view className="section-divider" />
        <view className="option-row">
          <text className="option-text">Why this video</text>
        </view>
      </view>
      <view className="modal-overlay"bindtap={onClose}/>
    </view>
  );
}
