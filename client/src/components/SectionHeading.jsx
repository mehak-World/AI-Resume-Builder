import React from 'react'

const SectionHeading = ({title, description}) => {
  return (
    <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-slate-500 mb-4">
          {description}
        </p>
    </div>
  )
}

export default SectionHeading
