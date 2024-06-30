import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import SWR from 'swr'
import Link from 'next/link'
import { getMenuItem } from '../utils/layout-get-menu'
import Signinbutton from './signincomponent';
import SignOutbutton from './signoutcomponent';
import NavBarDisclosure from './navbarDisclosure'
//import fetch from 'fetch';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default async function Navbar({ user }: { user: any }) {
  
  const menuData  = await getMenuItem();
  const [menu] = await Promise.all([menuData])
  if (!menu) return <p>No Data , review config!</p>
  return (
    
 <NavBarDisclosure user={user} menu={menu}> </NavBarDisclosure>
   
   
   
  );
}
