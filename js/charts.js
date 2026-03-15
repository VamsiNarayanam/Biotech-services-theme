if (typeof Chart !== 'undefined') {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  Chart.defaults.color = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const chartDefaults = {
    plugins: {
      legend: { labels: { color: textColor } }
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  const role = sessionStorage.getItem('userRole') || 'Admin';

  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    const chartConfigs = {
      Patient: {
        label: 'Test Results',
        data: [2, 3, 1, 4, 2, 5],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      Researcher: {
        label: 'Samples Processed',
        data: [15, 22, 18, 28, 24, 32],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      Admin: {
        label: 'Revenue ($)',
        data: [3200, 4100, 3800, 5200, 4900, 6200],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      }
    };
    const cfg = chartConfigs[role] || chartConfigs.Admin;
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: cfg.labels,
        datasets: [{
          label: cfg.label,
          data: cfg.data,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { ...chartDefaults, responsive: true, maintainAspectRatio: false }
    });
  }

  const ordersCtx = document.getElementById('ordersChart');
  if (ordersCtx) {
    const chartConfigs = {
      Patient: {
        label: 'Appointments',
        data: [1, 2, 1, 3, 2, 2, 1],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      Researcher: {
        label: 'Projects',
        data: [3, 5, 2, 6, 4, 2, 3],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      Admin: {
        label: 'Orders',
        data: [12, 19, 8, 15, 22, 18, 14],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    };
    const cfg = chartConfigs[role] || chartConfigs.Admin;
    new Chart(ordersCtx, {
      type: 'bar',
      data: {
        labels: cfg.labels,
        datasets: [{
          label: cfg.label,
          data: cfg.data,
          backgroundColor: 'rgba(14, 165, 233, 0.7)',
          borderRadius: 6
        }]
      },
      options: { ...chartDefaults, responsive: true, maintainAspectRatio: false }
    });
  }

  const trafficCtx = document.getElementById('trafficChart');
  if (trafficCtx) {
    const trafficConfigs = {
      Patient: {
        label1: 'Tests Requested',
        label2: 'Appointments',
        data1: [3, 5, 4, 7],
        data2: [2, 3, 2, 4]
      },
      Researcher: {
        label1: 'Samples Processed',
        label2: 'Analyses Completed',
        data1: [120, 180, 150, 220],
        data2: [80, 110, 95, 140]
      },
      Admin: {
        label1: 'Page Views',
        label2: 'Visitors',
        data1: [2400, 3200, 2800, 4100],
        data2: [1200, 1800, 1500, 2200]
      }
    };
    const tcfg = trafficConfigs[role] || trafficConfigs.Admin;
    new Chart(trafficCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          { label: tcfg.label1, data: tcfg.data1, borderColor: '#6366f1', fill: true, backgroundColor: 'rgba(99, 102, 241, 0.1)', tension: 0.4 },
          { label: tcfg.label2, data: tcfg.data2, borderColor: '#0ea5e9', fill: true, backgroundColor: 'rgba(14, 165, 233, 0.1)', tension: 0.4 }
        ]
      },
      options: { ...chartDefaults, responsive: true, maintainAspectRatio: false }
    });
  }

  const behaviorCtx = document.getElementById('behaviorChart');
  if (behaviorCtx) {
    const behaviorConfigs = {
      Patient: {
        labels: ['Completed', 'Processing', 'Pending'],
        data: [12, 5, 3]
      },
      Researcher: {
        labels: ['Genomics', 'Diagnostics', 'Bioinformatics'],
        data: [45, 30, 25]
      },
      Admin: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [55, 35, 10]
      }
    };
    const bcfg = behaviorConfigs[role] || behaviorConfigs.Admin;
    new Chart(behaviorCtx, {
      type: 'doughnut',
      data: {
        labels: bcfg.labels,
        datasets: [{
          data: bcfg.data,
          backgroundColor: ['#6366f1', '#0ea5e9', '#06b6d4'],
          borderWidth: 0
        }]
      },
      options: { ...chartDefaults, responsive: true, maintainAspectRatio: false }
    });
  }
}
