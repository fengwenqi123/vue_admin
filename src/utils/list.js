export function list() {
  const listtable = [{
    value: '0',
    icon: 'jk',
    label: '全部',
    path: '/dashboard/levelOne'
  }, {
    value: '1',
    icon: 'hangbiao',
    label: '船舶',
    path: '/dashboard/shipInformation'
  }, {
    value: '2',
    icon: '',
    label: '区间监管',
    path: '/dashboard/QJsupervise'
  }, {
    value: '3',
    icon: 'jk',
    label: '视频监控',
    path: '/dashboard/monitor'
  }, {
    value: '4',
    label: '卡口',
    icon: 'kakou',
    path: '/dashboard/kakou'
  }, {
    value: '5',
    label: '锚泊区',
    icon: 'maobo',
    path: ''
  }, {
    value: '6',
    label: '助航标志',
    icon: 'zhuhang',
    path: ''
  }, {
    value: '7',
    label: '海事站所',
    icon: 'haishi',
    path: '/dashboard/station'
  }, {
    value: '8',
    label: '船闸',
    icon: 'chuanzha',
    path: ''
  }, {
    value: '9',
    label: '跨河建筑物',
    icon: 'jianzhu',
    path: ''
  }, {
    value: '10',
    label: '物资储备',
    icon: 'wuzi',
    path: '/dashboard/materials'
  }, {
    value: '11',
    label: '航行通告',
    icon: 'tonggao',
    path: ''
  }, {
    value: '12',
    label: '码头',
    icon: 'matou',
    path: '/dashboard/wharf'
  }, {
    value: '13',
    label: 'AIS',
    icon: 'baseStation',
    path: '/dashboard/Ais'
  }, {
    value: '14',
    label: 'VHF基站',
    icon: 'baseStation',
    path: '/dashboard/VHF'
  }, {
    value: '15',
    label: '泊位',
    icon: 'berth',
    path: '/dashboard/berth'
  }]
  return listtable
}
