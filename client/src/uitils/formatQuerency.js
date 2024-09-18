
export const formatQuerency=(price)=>{
  const number = Number(price)
   return(number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" 원")
}
