
import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'
import { ModeToggle } from './ThemeToggle'
import { auth } from '@/auth'

const Navbar = async () => {

    const session = await auth()

    return (
        <div className='flex justify-between px-4 py-4'>
            <NavigationMenu className='flex-1'>
                <NavigationMenuList className='gap-2'>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {session ? (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    ) : (
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/login">Sign In</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
        </div>
    )
}

export default Navbar