const testWithMessage = message => func => {
      console.log(message)
      try {
        func()
        console.log('  ✅ OK')
      } catch (error) {
        console.error('  ❌ FAIL')
        throw error
      }
    }
    , test = module.exports = (first, ...rest) => {
      if (Array.isArray(first)) {
        return testWithMessage(String.raw(first, ...rest))
      }
      if (typeof first === 'string')
        return testWithMessage(first)
      if (typeof first === 'function')
        return testWithMessage(first.toString())(first)    
    }