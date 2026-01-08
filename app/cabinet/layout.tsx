import React from 'react'
import Logo from './_components/aside/Logo'
import { } from "@heroicons/react/24/outline";
import { NavbarSidePanelIcon } from '@/public/icons';
import { Button } from '@/components/ui/button';


const CabinetLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex items-stretch min-h-[100dvh] max-h-[100dvh]'>
            <aside className='w-[243px] bg-[var(--sidebar-primary)] border-r'>
                <div className='flex items-center justify-between h-[64px] w-full px-6 border-b'>
                    <Logo />
                    <Button
                        className='bg-transparent hover:!bg-[#F3F5F7] cursor-pointer'
                    >
                        <NavbarSidePanelIcon />
                    </Button>
                </div>
            </aside>
            <main className='flex flex-col flex-1'>
                <header className='py-3 px-4 h-[64px] bg-[var(--header-primary)] border-b flex items-center'>
                    Header
                </header>
                <section className='flex-1 py-5 px-4 pb-7 max-h-[calc(100dvh-64px)] overflow-y-auto'>
                    {children}
                </section>
            </main>
        </div>
    )
}

export default CabinetLayout