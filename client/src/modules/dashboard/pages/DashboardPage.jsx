import PageHeader from '../../../components/ui/PageHeader'
import DashboardCard from '../../../components/ui/DashboardCard'
import SectionCard from '../../../components/ui/SectionCard'
import PageContainer from '../../../components/ui/PageContainer'
import usePageTitle from '../../../hooks/usePageTitle'
import { formatDate } from '../../../utils/formatDate'
import { getDashboardCards, getQuickActions, getRecentActivity } from '../../../services/dashboardService'

export default function DashboardPage() {
  usePageTitle('Dashboard')

  const metrics = getDashboardCards()
  const quickActions = getQuickActions()
  const recentActivity = getRecentActivity()
  const today = formatDate(new Date())

  return (
    <PageContainer>
      <PageHeader title="Dashboard" breadcrumb={['Admin', 'Dashboard']} />

      <section className="rounded-[28px] border border-slate-700 bg-slate-950/85 p-6 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">A clean operations overview for the day.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Monitor critical metrics, activity, and next actions from a single, professional dashboard.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-700 bg-slate-900/95 px-5 py-4 text-slate-300">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Today</p>
            <p className="mt-3 text-xl font-semibold text-white">{today}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <DashboardCard key={metric.title} {...metric} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard title="Recent activity" footer="Live operational summary">
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-slate-700 bg-slate-950/80 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                    {formatDate(new Date(item.date))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quick actions" footer="Recommended first steps">
          <div className="space-y-4">
            {quickActions.map((action) => (
              <div key={action.id} className="rounded-[24px] border border-slate-700 bg-slate-950/80 p-5">
                <p className="font-semibold text-white">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{action.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Charts overview" footer="Designed for future analytics">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[28px] border border-slate-700 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Operations snapshot</p>
            <div className="mt-6 h-56 rounded-[24px] bg-slate-900/95" />
          </div>
          <div className="rounded-[28px] border border-slate-700 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trend overview</p>
            <div className="mt-6 h-56 rounded-[24px] bg-slate-900/95" />
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  )
}
