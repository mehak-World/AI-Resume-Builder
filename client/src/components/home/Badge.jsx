import React from 'react'

const Badge = ({title}) => {
  return (
     <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
            <svg width="15" height="18" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
                    stroke="#178037ff" strokeMiterlimit="5.759" strokeLinecap="round" />
            </svg>
            <span>{title}</span>
        </div>
  )
}

export default Badge
