export function getDashboardCards() {
  return [
    { title: 'Active teams', value: '12', description: 'Teams collaborating across departments.' },
    { title: 'Open tasks', value: '28', description: 'Tasks waiting for action from managers.' },
    { title: 'Pending approvals', value: '8', description: 'Approvals requiring review this week.' },
    { title: 'System alerts', value: '2', description: 'Operational items needing attention.' },
  ]
}

export function getQuickActions() {
  return [
    { id: 'review', label: 'Review pending approvals', description: 'Complete items in the approval queue.' },
    { id: 'publish', label: 'Update team plans', description: 'Keep teams aligned with the latest goals.' },
    { id: 'audit', label: 'Check system status', description: 'Verify primary systems are operating normally.' },
  ]
}

export function getRecentActivity() {
  return [
    { id: '1', title: 'Staff roster updated', subtitle: 'Employee assignments reviewed by HR team.', date: '2026-07-30' },
    { id: '2', title: 'Revenue forecast drafted', subtitle: 'Financial projection finalized for Q3.', date: '2026-07-29' },
    { id: '3', title: 'Security review completed', subtitle: 'Platform controls verified by IT operations.', date: '2026-07-28' },
  ]
}
