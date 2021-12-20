import term from "./terms";

let statuses = [term('private'), term('public'), term('pending')]

export default {
  tasks: [
    {
      id: 0,
      type: "Meeting",
      title: "Meeting with Andrew Piker",
      time: "9:00"
    },
    {
      id: 1,
      type: "Call",
      title: "Call with HT Company",
      time: "12:00"
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Zoe Alison",
      time: "14:00"
    },
    {
      id: 3,
      type: "Interview",
      title: "Interview with HR",
      time: "15:00"
    }
  ],
  bigStat: [
    {
      product: term('businesses'),
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: term('events'),
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: term('points'),
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    },
    {
      product: term('routes'),
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
  MetroStats: [
    {
      product: term('lodging'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'lodging'
    },
    {
      product: term('attraction'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'attraction'
    },
    {
      product: term('culture'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'culture'
    },
    {
      product: term('local'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'local'
    },
    {
      product: term('travel'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'travel'
    },
    {
      product: term('food'),
      places: Math.floor(Math.random() * 1000) + 1,
      added: Math.floor(Math.random() * 10) + 1,
      svg: 'food'
    },
  ],
  table: [
    {
      id: 0,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 4,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 5,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 6,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 7,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 8,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 9,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 10,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 11,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 12,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 13,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 14,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 15,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 16,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
    {
      id: 17,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      name: "שם העסק",
      impact: Math.floor(Math.random() * 100) + 1,
      category: "אוכל",
      tag: "מסעדות ובתי קפה",
      authority: "שער הנגב",
      address: "שדרות",
      edit: new Date().toLocaleDateString(),
    },
  ],
  tableCategories: {
    impact: ['1-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
    status: ['private', 'public', 'pending'],
    category: ['all', 'lodging', 'attraction', 'culture', 'local', 'travel', 'food']
  }
};
