const generateToken = ()=>{
  return  Math.floor(100000 + Math.random() * 90000000)   
}
module.exports = generateToken;