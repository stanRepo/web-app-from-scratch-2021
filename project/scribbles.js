const cryptoRequest = new Request('crypo-url', {
    headers: { Authorization: 'token' },
  })
  
  cryptoRequest.onfulfilled = function (err, data) {
    if (err) {
      console.error(err)
      return
      // stoppen op error
    }
    console.log(data)
    // verder met data
  }
  
  function parseData() {
    const data = cryptoRequest.data
    return data ? data.map() : undefined
    // hier misschien niet
  }
  
  class Request {
    data = undefined
    url = ''
    options = ''
    
    constructor(url, options, page = {start: 0, end: 10}) {
      this.url = url
      this.options = options
      this.page = page
      fetch(`${url}?start=${page.start}&end=${page.end}`, options)
        .then(res => res.json())
        .then(data => {
          this.data = data
          onfulfilled(null, this.data)
        })
        .catch(err => {
          onfulfilled(err)
        })
    }
    
    paginate() {
      this.page = {
        start: this.page.end
        end: this.page.end + (this.page.end - this.page.start)
      }
      fetch(`${this.url}?start=${this.page.start}&end=${this.page.end}`, this.options).then(parseJSON).then(data => {
        this.data = data
        this.onfulfilled(this.data)
      })
    }
    
    refetch() {
      fetch(`${this.url}?start=${this.page.start}&end=${this.page.end}`, this.options).then(res =>res.json)
    }
    
    parseJSON(res) {
      return res.json()
    }
  
    onfulfilled() {}
}
  
