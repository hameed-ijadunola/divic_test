// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import Shipment from '@/assets/svgs/boxes-icon 2.svg';
import Shipment1 from '@/assets/svgs/boxes-icon 1.svg';
import Scan from '@/assets/svgs/barcode-scan-icon 1.svg';
import Scan1 from '@/assets/svgs/barcode-scan-icon 2.svg';
import Wallet from '@/assets/svgs/wallet-icon 1.svg';
import Wallet1 from '@/assets/svgs/wallet-icon 2.svg';
import Profile from '@/assets/svgs/avatar-icon 1.svg';
import Profile1 from '@/assets/svgs/avatar-icon 2.svg';

function TabBarIcon({ name, focused, style, ...rest }: ComponentProps<any>) {
  const iconOptions = {
    Shipments: [<Shipment style />, <Shipment1 style />],
    Scan: [<Scan style />, <Scan1 style />],
    Wallet: [<Wallet style />, <Wallet1 style />],
    Profile: [<Profile style />, <Profile1 style />],
  };
  return iconOptions[name][focused ? 1 : 0];
}

export default TabBarIcon;
