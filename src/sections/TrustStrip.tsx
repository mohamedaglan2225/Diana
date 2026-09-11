import type { ReactNode } from 'react'
import { ClockIcon, GraduationIcon, StarIcon, UsersIcon } from '@/components/Icons'

const items: { icon: ReactNode; label: string }[] = [
  { icon: <ClockIcon />, label: '7+ Years Teaching' },
  { icon: <GraduationIcon />, label: 'TESOL / TEFL Certified' },
  { icon: <UsersIcon />, label: 'Children to Adults' },
  { icon: <StarIcon />, label: 'Interactive English Lessons' },
]

export function TrustStrip() {
  return (
    <div className="bg-white border-y border-[#EFF7FB]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-[#EFF7FB]">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-3 lg:justify-center lg:px-6">
              <span className="text-[#4A7C9B] shrink-0" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-[#2F3A40]">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
