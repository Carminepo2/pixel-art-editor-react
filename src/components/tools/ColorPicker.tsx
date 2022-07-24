import { Box, Button, ButtonBase, IconButton, Input, Stack } from "@mui/material";
import React from "react";
import { useDrawingBoardDispatch, useDrawingBoardSelector } from "../../store/drawing-board/hooks";
import {
  selectSelectedPrimaryColor,
  selectSelectedSecondaryColor,
  setSelectedColor,
} from "../../store/drawing-board/slices/drawingBoardSlice";
import { normalizeHex } from "../../utils/colors";
import { ChromePicker, ColorChangeHandler } from "react-color";
import { Popover } from "@headlessui/react";
import ColorFillType from "../../types/fillColor";

const ColorPicker: React.FC = () => {
  const dispatch = useDrawingBoardDispatch();
  const selectedPrimaryColor = useDrawingBoardSelector(selectSelectedPrimaryColor);
  const selectedSecondaryColor = useDrawingBoardSelector(selectSelectedSecondaryColor);

  const handleChange = (type: ColorFillType) => {
    return (color: string) => dispatch(setSelectedColor({ type, color }));
  };

  const normalizedSelectedPrimaryColorHex = React.useMemo(() => {
    return normalizeHex(selectedPrimaryColor);
  }, [selectedPrimaryColor]);

  const normalizedSelectedSecondaryColorHex = React.useMemo(() => {
    return normalizeHex(selectedSecondaryColor);
  }, [selectedSecondaryColor]);

  return (
    <Box position="relative">
      <Box>
        <IconButton size="small"></IconButton>
      </Box>
      <Stack alignItems="start">
        <Box sx={{ padding: 0, position: "relative", top: 9, left: 15 }}>
          <ColorPickerButton
            color={normalizedSelectedPrimaryColorHex}
            onChange={handleChange("primary")}
            ariaLabel="Select primary fill color"
          />
        </Box>
      </Stack>
      <Stack alignItems="end">
        <Box sx={{ padding: 0, position: "relative", bottom: 9, right: 15 }}>
          <ColorPickerButton
            color={normalizedSelectedSecondaryColorHex}
            onChange={handleChange("secondary")}
            ariaLabel="Select secondary fill color"
          />
        </Box>
      </Stack>
    </Box>
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
      <Popover.Button as="div">
        <ButtonBase
          onClick={onChange.bind(null, color)}
          sx={{ height: 40, width: 40, backgroundColor: color, p: 0, m: 0, border: 1, borderColor: "gray" }}
          aria-label={ariaLabel}
        />
      </Popover.Button>

      <Popover.Panel style={{ position: "absolute", zIndex: 99 }}>
        <ChromePicker color={color} onChange={handleChange} disableAlpha />
      </Popover.Panel>
    </Popover>
  );
};

export default ColorPicker;
