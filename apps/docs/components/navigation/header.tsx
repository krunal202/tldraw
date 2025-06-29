'use client'

import { type IconName } from '@/components/common/icon'
import { Logo } from '@/components/common/logo'
import { NavigationLink } from '@/components/navigation/link'
import { MobileMenu } from '@/components/navigation/mobile-menu'
import { SocialLink } from '@/components/navigation/social-link'
import { SearchButton } from '@/components/search/SearchButton'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { ThemeSwitch } from '../common/theme-switch'

const mainLinks = [
	// { caption: 'Features', active: () => false, href: '/#features' },
        {
                caption: 'Docs',
                href: '/quick-start',
		active: (pathname: string) =>
			[
				'/quick-start',
				'/installation',
				'/releases',
				'/docs',
				'/community',
				'/reference',
				'/search',
			].some((e) => pathname.startsWith(e)) && !pathname.startsWith('/search/blog'),
        },
       {
               caption: 'Frameworks',
               href: '/frameworks/vue',
               active: (pathname: string) => ['/frameworks'].some((e) => pathname.startsWith(e)),
       },
        {
                caption: 'Examples',
                href: '/examples',
		active: (pathname: string) => ['/examples'].some((e) => pathname.startsWith(e)),
	},
	{ caption: 'Pricing', active: () => false, href: '/#pricing' },
	{
		caption: 'Blog',
		href: '/blog',
		active: (pathname: string) => ['/blog', '/search/blog'].some((e) => pathname.startsWith(e)),
	},
]

const socialLinks = [
	{
		caption: 'Twitter/X',
		icon: 'twitter' as IconName,
		href: 'https://x.com/tldraw/',
	},
	{
		caption: 'Discord',
		icon: 'discord' as IconName,
		href: 'https://discord.tldraw.com/?utm_source=docs&utm_medium=organic&utm_campaign=sociallink',
	},
	{
		caption: 'GitHub',
		icon: 'github' as IconName,
		href: 'https://github.com/tldraw/tldraw',
	},
]

export function Header() {
	const pathname = usePathname()
	const { scrollY } = useScroll()
	const navOpacity = useTransform(scrollY, [0, 32], [1, 0])
	const opacityEffect = pathname !== '/'
	const socialsOpacityEffect = pathname === '/search'

	return (
		<header className="sticky top-0 w-full bg-white dark:bg-zinc-950 z-10">
			<nav className="w-full max-w-screen-xl mx-auto px-5 h-14 md:h-[4.5rem] flex justify-between items-center text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 dark:md:border-transparent md:border-transparent">
				<Link href="/" className="w-28">
					<Logo className="h-6" />
				</Link>
				<ul className="hidden sm:flex md:hidden gap-8">
					{mainLinks.map((item, index) => (
						<li key={index}>
							<NavigationLink {...item} active={item.active(pathname)} />
						</li>
					))}
				</ul>
				<motion.ul
					style={{ opacity: opacityEffect ? navOpacity : 1 }}
					className="hidden md:flex gap-8"
				>
					{mainLinks.map((item, index) => (
						<li key={index}>
							<NavigationLink {...item} active={item.active(pathname)} />
						</li>
					))}
				</motion.ul>
				<motion.ul
					style={{ opacity: socialsOpacityEffect ? navOpacity : 1 }}
					className="hidden sm:flex w-28 gap-4 justify-end xl:!opacity-100"
				>
					{socialLinks.map((item, index) => (
						<li key={index}>
							<SocialLink {...item} />
						</li>
					))}
					<ThemeSwitch />
				</motion.ul>
				<div className="flex items-center sm:hidden -mr-2">
					{!pathname.startsWith('/search') && (
						<SearchButton type={pathname.startsWith('/blog') ? 'blog' : 'docs'} layout="mobile" />
					)}
					<Suspense>
						<MobileMenu main={mainLinks} social={socialLinks} />
					</Suspense>
				</div>
			</nav>
		</header>
	)
}
