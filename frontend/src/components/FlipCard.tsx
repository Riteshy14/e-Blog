import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for floating animation
const float = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  75% {
    transform: translate(5px, 5px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

// Card Container (applies perspective for the 3D effect)
const CardContainer = styled.div<{ $isHovered: boolean }>`
  position: relative;
  width: 9rem; /* Smaller card size */
  height: 9rem; /* Smaller height */
  perspective: 1000px; /* 3D perspective to allow the flip effect */
  transition: transform 0.5s ease-in-out, box-shadow 0.3s ease;

  /* Apply floating animation by default */
  animation: ${float} 2s ease-in-out infinite;

  /* Flip the card on hover */
  transform: ${(props) => (props.$isHovered ? 'translateY(-8px)' : 'translateY(0)')};
  box-shadow: ${(props) =>
    props.$isHovered
      ? '0 0px 0px rgba(0, 0, 0, 0.15)'
      : '0 px px rgba(0, 0, 0, 0.1)'};
`;

// Inner Card (this will apply the 2D tilt effect)
const CardInner = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d; /* This allows for 3D transformations (for consistency) */
  transition: transform 0.5s ease;
  transform: ${(props) => (props.$isHovered ? 'rotateY(180deg)' : 'skewX(-20deg)')}; /* Flip on hover, tilt by default */
`;

// Card Faces (front and back of the card)
const CardFace = styled.div<{ $isFront: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border-radius: 0.5rem;

  transform: ${(props) => (props.$isFront ? 'rotateY(0deg)' : 'rotateY(180deg)')};
`;

interface FlipCardProps {
  header: string;
  content: string;
  back: string;
  back2: string;
}

const FlipCard = ({ header, content, back, back2 }: FlipCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <CardContainer
      $isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardInner $isHovered={isHovered}>
        <CardFace $isFront={true}>
          <div className="h-full w-full rounded-xl shadow shadow-slate-400 bg-slate-300 p-2 ">
            <div className="bg-slate-50 rounded-xl shadow shadow-gray-400 text-center flex flex-col justify-center items-center  h-full w-full border-black">
              <h2 className="font-bold  text-black text-sm p-1 ">{header}</h2>
              <p className='text-xs p-1  pt-0 text-gray-950'>{content}</p>
            </div>
          </div>
        </CardFace>
        <CardFace $isFront={false}>
          <div className='shadow w-full h-full shadow-gray-300 rounded-xl p-2'>
            <div className='flex flex-col font-bold text-gray-700 text-center justify-center h-full'>
            <h2>{back}</h2>
            <p>{back2}</p>
            </div>
          </div>
        </CardFace>
      </CardInner>
    </CardContainer>
  );
};

export default FlipCard;
