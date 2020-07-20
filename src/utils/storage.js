
class Storage {
  static setItem(name,data){
    sessionStorage.setItem(name,JSON.stringify(data))
  }
  static getItem(name){
    return JSON.parse(sessionStorage.getItem(name)) || '[]'
  }
}

export {
  Storage
}