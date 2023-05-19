import React from 'react';

import tw from 'tailwind-styled-components';

import { Slider } from '@mui/material';

import {
  changeBrushWidth,
  changeSelectedTool,
} from '@/store/slice/game/drawSlice';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';

// Icons
import BrushIcon from '../../../../../../public/icons/brush.svg';
import EraserIcon from '../../../../../../public/icons/eraser.svg';
import NextIcon from '../../../../../../public/icons/next.svg';
import PaintBucketIcon from '../../../../../../public/icons/paint-bucket.svg';
import ReturnIcon from '../../../../../../public/icons/return.svg';
import RecycleBinIcon from '../../../../../../public/icons/recycle-bin.svg';

const BRUSH_WIDTH_LIST = [
  [4, 'bg-black rounded-full w-[4px] h-[4px]'],
  [8, 'bg-black rounded-full w-[8px] h-[8px]'],
  [12, 'bg-black rounded-full w-[12px] h-[12px]'],
  [16, 'bg-black rounded-full w-[16px] h-[16px]'],
  [24, 'bg-black rounded-full w-[24px] h-[24px]'],
];

export default function CanvasOptions({
  prevClickHandler,
  nextClickHandler,
  trashBinClickHandler,
}: {
  prevClickHandler: () => void;
  nextClickHandler: () => void;
  trashBinClickHandler: () => void;
}) {
  const { brushWidth, selectedTool, paletteColor, canvasBgColor } =
    useAppSelector((state) => state.draw);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full bg-[#88CDFF] rounded-lg p-4 flex justify-between">
      <Option>
        <BrushWidthList>
          {BRUSH_WIDTH_LIST.map((brush) => (
            <BrushWidthItem
              key={brush[0]}
              onClick={() => {
                dispatch(changeBrushWidth(brush[0] as number));
              }}
              className={brushWidth === brush[0] ? 'bg-[#146C94]' : ''}
            >
              <div className={brush[1] as string} />
            </BrushWidthItem>
          ))}
        </BrushWidthList>
        <div className="p-2 outline outline-1 rounded-lg flex justify-between items-center gap-4">
          <div className="w-[14px] h-[14px] rounded-full bg-gray-300" />
          <Slider
            min={1}
            step={1}
            max={50}
            value={brushWidth}
            onChange={(_, value) => {
              dispatch(changeBrushWidth(value as number));
            }}
            defaultValue={brushWidth}
            valueLabelDisplay="auto"
            className="w-full"
          />
          <div className="w-[14px] h-[14px] rounded-full bg-black" />
        </div>
      </Option>
      <Tools>
        <ToolItem
          onClick={() => {
            dispatch(changeSelectedTool('brush'));
          }}
          className={selectedTool === 'brush' ? 'bg-[#146C94]' : ''}
        >
          <BrushIcon
            width={32}
            height={32}
            fill={selectedTool === 'brush' ? '#FFFFFF' : '#000000'}
          />
        </ToolItem>
        <ToolItem
          onClick={() => {
            dispatch(changeSelectedTool('erase'));
          }}
          className={selectedTool === 'erase' ? 'bg-[#146C94]' : ''}
        >
          <EraserIcon
            width={32}
            height={32}
            fill={selectedTool === 'erase' ? '#FFFFFF' : '#000000'}
          />
        </ToolItem>
        <ToolItem
          onClick={() => {
            dispatch(changeSelectedTool('fill'));
          }}
          className={selectedTool === 'fill' ? 'bg-[#146C94]' : ''}
        >
          <PaintBucketIcon
            width={32}
            height={32}
            fill={selectedTool === 'fill' ? '#FFFFFF' : '#000000'}
          />
        </ToolItem>
        <ToolItem onClick={prevClickHandler}>
          <ReturnIcon width={32} height={32} />
        </ToolItem>
        <ToolItem onClick={nextClickHandler}>
          <NextIcon width={32} height={32} />
        </ToolItem>
        <ToolItem onClick={trashBinClickHandler}>
          <RecycleBinIcon width={32} height={32} />
        </ToolItem>
      </Tools>
    </div>
  );
}

const Option = tw.div`
  min-w-[240px]
  w-2/5
  h-full

  bg-white
  rounded-lg

  p-2

  flex
  flex-col
  justify-between
  gap-2
`;

const BrushWidthList = tw.div`
  p-2

  outline
  outline-1
  rounded-lg

  flex
  justify-between
  items-center
`;

const BrushWidthItem = tw.div`
  w-[32px]
  h-[32px]

  bg-gray-300
  rounded-full

  flex
  justify-center
  items-center
`;

const Tools = tw.div`
  min-w-[240px]
  w-2/5
  h-full

  bg-white
  rounded-lg

  p-2

  grid
  grid-rows-2
  grid-cols-3
  gap-2
`;

const ToolItem = tw.div`
  flex
  justify-center
  items-center

  rounded-lg
  outline
  outline-1
`;
