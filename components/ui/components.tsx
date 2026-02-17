import React from 'react'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {action && (
        <a
          href={action.href}
          className="inline-block text-blue-600 hover:text-blue-700 font-medium"
        >
          {action.label} ←
        </a>
      )}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  gradient: string
  subtitle?: string
}

export function StatCard({ title, value, icon, gradient, subtitle }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-xs text-white/70 mt-1">{subtitle}</p>}
        </div>
        <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  )
}

interface TableProps {
  headers: string[]
  children: React.ReactNode
  gradient: string
}

export function Table({ headers, children, gradient }: TableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`bg-gradient-to-r ${gradient}`}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
