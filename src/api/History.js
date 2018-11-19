import request from '@/utils/request'

// import qs from 'qs'

export function HisLists(sectionId, startTime, endTime, leaveStartTime, leaveEndTime, direction, alarmLevel, alarmStatus, alarmStartTime, alarmEndTime, shipCheckStatus, checkedStatus, handleStartTime, handleEndTime, itemId, keyWord, pageNum, pageSize) {
  return request({
    url: '/check/shipCheck/historyCheckQuery',
    method: 'GET',
    params: {
      sectionId,
      startTime,
      endTime,
      leaveStartTime,
      leaveEndTime,
      direction,
      alarmLevel,
      alarmStatus,
      alarmStartTime,
      alarmEndTime,
      shipCheckStatus,
      checkedStatus,
      handleStartTime,
      handleEndTime,
      itemId,
      keyWord,
      pageNum,
      pageSize
    }
  })
}
