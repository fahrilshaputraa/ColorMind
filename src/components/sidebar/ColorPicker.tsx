import React from 'react';
import { usePaletteStore } from '../../store/paletteStore';
import { ColorSwatch } from '../shared/ColorSwatch';

export const ColorPicker: React.FC = () => {
  const { colors, toggleLockColor, updateColor } = usePaletteStore();

  return (
    <div className="flex flex-col gap-3">
      {colors.map((color, index) => (
        <ColorSwatch
          key={index}
          index={index}
          hex={color.hex}
          locked={color.locked}
          onToggleLock={() => toggleLockColor(index)}
          onChangeHex={(hex) => updateColor(index, hex)}
        />
      ))}
    </div>
  );
};
export default ColorPicker;
