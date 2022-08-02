import React from "react";
import { useDrawingBoardDispatch, useDrawingBoardSelector } from "@/store/drawing-board/hooks";
import {
  selectSelectedPrimaryColor,
  selectSelectedSecondaryColor,
  setSelectedColor,
  swapPrimaryAndSecondaryColors,
} from "@/store/drawing-board/slices/drawingBoardSlice";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { Popover } from "@headlessui/react";
import ColorFillType from "@/types/fillColor";
import { TbArrowsUpRight } from "react-icons/tb";

const ColorPicker: React.FC = () => {
  const dispatch = useDrawingBoardDispatch();
  const selectedPrimaryColor = useDrawingBoardSelector(selectSelectedPrimaryColor);
  const selectedSecondaryColor = useDrawingBoardSelector(selectSelectedSecondaryColor);

  const handleSwapPrimaryAndSecondaryColor = () => {
    dispatch(swapPrimaryAndSecondaryColors());
  };

  const handleChange = (type: ColorFillType) => {
    return (color: string) => dispatch(setSelectedColor({ type, color }));
  };

  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="p-0 relative top-2 left-3.5">
          <ColorPickerButton
            color={selectedPrimaryColor}
            onChange={handleChange("primary")}
            ariaLabel="Select primary fill color"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="p-0 relative bottom-3 right-3.5">
          <ColorPickerButton
            color={selectedSecondaryColor}
            onChange={handleChange("secondary")}
            ariaLabel="Select secondary fill color"
          />
        </div>
      </div>
      <div onClick={handleSwapPrimaryAndSecondaryColor} className="absolute bottom-3 left-3.5">
        <button>
          <TbArrowsUpRight />
        </button>
      </div>
    </div>
  );
};

interface ColorPickerButtonProps {
  color: string;
  onChange: (color: string) => void;
  ariaLabel: string;
}

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({ color, onChange, ariaLabel }) => {
  const handleChange: ColorChangeHandler = (color) => {
    onChange(color.hex);
  };
  return (
    <Popover>
      <Popover.Button
        onClick={onChange.bind(null, color)}
        className="h-10 w-10 p-0 m-0 border border-gray-400 rounded"
        style={{ backgroundColor: color }}
        aria-label={ariaLabel}
      />
      <Popover.Panel className="absolute z-50">
        <ChromePicker color={color} onChange={handleChange} disableAlpha />
      </Popover.Panel>
    </Popover>
  );
};

export default ColorPicker;
