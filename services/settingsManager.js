import { 
  _STOSETTING,
  needSam,
  autoSync,
  gistID
} from "./stoKeys";

function getSetting(key) {
  const [settings, error] = getSettings()
  if (error) {
    console.error(error)
    return [null, error]
  }
  return [settings[key], null]
}

function toggleSetting(key) {
  const [settings, error] = getSettings()
  if (error) {
    console.error(error)
    return [null, error]
  }
  settings[key] = !settings[key]
  return setSettings(settings)
}

function configSetting(key, value) {
  const [settings, error] = getSettings()
  if (error) {
    console.error(error)
    return [null, error]
  }
  settings[key] = value
  return setSettings(settings)
}

function setSettings(settings) {
  try {
    wx.setStorageSync(_STOSETTING, JSON.stringify(settings))
    return [true, null]
  } catch (error) {
    // console.log(error)
    return [false, error]
  }
}

function getSettings() {
  try {
    var res = wx.getStorageSync(_STOSETTING)
    try {
      res = JSON.parse(res)
    } catch (error) {
      res = {}
    }
    return [res, null]
  } catch (error) {
    // console.log(error)
    return [null, error]
  }
}

function toggleSync() {
  return toggleSetting(autoSync)
}

function toggleSam() {
  return toggleSetting(needSam)
}

function setGistID(id) {
  return configSetting(gistID, id)
}

function getSam() {
  return getSetting(needSam)
}

module.exports = {
  toggleSync,
  toggleSam,
  setGistID,
  getSettings,
  getSam
}